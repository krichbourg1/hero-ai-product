-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT,
    description TEXT,
    photo_url TEXT,
    color_hex TEXT DEFAULT '#000000',
    border_style TEXT DEFAULT 'squircle',
    summary TEXT,
    first_name TEXT,
    last_name TEXT,
    job_title TEXT,
    city TEXT,
    country TEXT,
    phone TEXT,
    email TEXT,
    skills TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create work_experiences table
CREATE TABLE IF NOT EXISTS public.work_experiences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE NOT NULL,
    position TEXT,
    company TEXT,
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create educations table
CREATE TABLE IF NOT EXISTS public.educations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE NOT NULL,
    degree TEXT,
    school TEXT,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    stripe_customer_id TEXT UNIQUE NOT NULL,
    stripe_subscription_id TEXT UNIQUE NOT NULL,
    stripe_price_id TEXT NOT NULL,
    stripe_current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    stripe_cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_work_experiences_resume_id ON public.work_experiences(resume_id);
CREATE INDEX IF NOT EXISTS idx_educations_resume_id ON public.educations(resume_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON public.resumes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_work_experiences_updated_at BEFORE UPDATE ON public.work_experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_educations_updated_at BEFORE UPDATE ON public.educations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON public.user_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Resumes policies
CREATE POLICY "Users can view own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON public.resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON public.resumes FOR DELETE USING (auth.uid() = user_id);

-- Work experiences policies
CREATE POLICY "Users can view own work experiences" ON public.work_experiences FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert own work experiences" ON public.work_experiences FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own work experiences" ON public.work_experiences FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own work experiences" ON public.work_experiences FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
);

-- Education policies
CREATE POLICY "Users can view own educations" ON public.educations FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert own educations" ON public.educations FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
);
CREATE POLICY "Users can update own educations" ON public.educations FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own educations" ON public.educations FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
);

-- User subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON public.user_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscriptions" ON public.user_subscriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own subscriptions" ON public.user_subscriptions FOR DELETE USING (auth.uid() = user_id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 

-- Resume Generation Tracking Table
CREATE TABLE IF NOT EXISTS resume_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id TEXT NOT NULL,
  service_type TEXT NOT NULL, -- 'military', 'police', etc.
  branch TEXT, -- for military resumes
  mos TEXT, -- for military resumes
  rank TEXT, -- for military resumes
  position TEXT, -- for police resumes
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_email TEXT,
  user_agent TEXT,
  ip_address TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_resume_generations_user_id ON resume_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_generations_generated_at ON resume_generations(generated_at);
CREATE INDEX IF NOT EXISTS idx_resume_generations_service_type ON resume_generations(service_type);

-- Enable RLS
ALTER TABLE resume_generations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own resume generations" ON resume_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resume generations" ON resume_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policy (you can adjust this based on your needs)
CREATE POLICY "Admins can view all resume generations" ON resume_generations
  FOR ALL USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'
  )); 