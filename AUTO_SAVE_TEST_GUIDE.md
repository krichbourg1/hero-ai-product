# Save and Continue Testing Guide

## Overview
This guide helps you test the "Save and Continue" functionality and interactive navigation for both military and police resume workflows. The application now uses explicit save buttons and allows users to navigate between completed steps.

## What Was Implemented
1. **Explicit Save Buttons**: All forms now use "Save and Continue" buttons instead of auto-save
2. **Interactive Navigation**: Step titles are clickable and preserve resume data
3. **Predictable Behavior**: Users have full control over when data is saved
4. **Stable Resume ID Generation**: Uses pattern `resume-${userId}-${serviceType}-${mos}-${rank}`
5. **Dashboard Integration**: "Continue Editing" properly loads saved data
6. **Error Prevention**: Eliminates race conditions and timing issues from auto-save
7. **Single Military Experience**: One military position with auto-population of duties
8. **Civilian Work Experience**: Optional civilian work experience section
9. **Clickable Skills**: Skills can be added and removed by clicking
10. **Multiple Experiences in Review**: Review page shows military and civilian experiences
11. **Multiple Experiences in Resume**: Generated resume includes all experiences

## Testing Steps

### Test 1: Military Resume Save and Continue
1. **Navigate to Military Resume Creation**
   - Go to `/build-resume/military`
   - Select a branch (e.g., Navy)

2. **Details Page**
   - Select a rank (e.g., E-4)
   - Select an MOS (e.g., AB - Aviation Boatswain)
   - ⚠️ **Open browser console** to see debug logs
   - Click "Save and Continue"
   - Look for: "Military details saved with ID: resume-..."

3. **Experience Page**
   - Fill in personal information (name, email)
   - Military experience is auto-populated from details page
   - **Test MOS/Rate auto-population** - enter MOS/Rate and Rank, duties should auto-fill
   - **Test "Add Civilian Experience" button** to add civilian work experience (manual entry)
   - Set start/end dates for each experience
   - Mark current positions with checkbox
   - Add duties for each experience (auto for military, manual for civilian)
   - Click "Save and Continue"
   - ⚠️ **Check console** for: "Military experience saved with ID: ..." and experience counts

4. **Skills Page**
   - Add education entries
   - Add skills (click to add, click again to remove)
   - Test skill removal by clicking selected skills
   - Click "Save and Continue"
   - ⚠️ **Check console** for: "Military skills saved with ID: ..."

5. **Review Page**
   - Verify all data appears correctly
   - Click "Generate Resume" to complete

6. **Interactive Navigation Test**
   - **Click on "Military Details"** in the navigation bar
   - Verify it takes you back to details page with all data preserved
   - **Click on "Experience"** in the navigation bar
   - Verify it takes you to experience page with all data loaded
   - **Click on "Skills & Training"** in the navigation bar
   - Verify it takes you to skills page with all data loaded
   - **Try clicking "Review"** - should work if you've completed all previous steps

7. **Dashboard Test**
   - Go to `/dashboard`
   - Find your resume in the list
   - Click "Continue Editing"
   - ⚠️ **Check console** for: "Loading resume data for resumeId: ..."
   - Verify all previously entered data is still present

### Test 2: Police Resume Save and Continue
1. **Navigate to Police Resume Creation**
   - Go to `/build-resume/police`

2. **Details Page**
   - Select a position (e.g., SWAT Sniper)
   - Select a rank (e.g., Officer)
   - Click "Save and Continue"
   - ⚠️ **Check console** for: "Police details saved with ID: ..."

3. **Experience Page**
   - Fill in personal information
   - Set department/agency (notice the enhanced field with warning)
   - Set start/end dates
   - Add duties
   - Click "Save and Continue"
   - ⚠️ **Check console** for: "Police experience saved with ID: ..."

4. **Skills Page**
   - Add education/training entries
   - Add skills (click to add, click again to remove)
   - Test skill removal by clicking selected skills
   - Click "Save and Continue"
   - ⚠️ **Check console** for: "Police skills saved with ID: ..."

5. **Review Page**
   - Verify all data appears correctly
   - Click "Generate Resume" to complete

6. **Interactive Navigation Test**
   - **Click on "Police Details"** in the navigation bar
   - Verify it takes you back to details page with all data preserved
   - **Click on "Experience"** in the navigation bar
   - Verify it takes you to experience page with all data loaded
   - **Click on "Skills & Training"** in the navigation bar
   - Verify it takes you to skills page with all data loaded
   - **Try clicking "Review"** - should work if you've completed all previous steps

7. **Dashboard Test**
   - Go to `/dashboard`
   - Find your police resume
   - Click "Continue Editing"
   - ⚠️ **Check console** for data loading logs
   - Verify all data is preserved

### Test 3: Data Persistence and Navigation
1. **Create Resume Partially**
   - Start creating a resume
   - Fill in details and experience pages
   - Go to dashboard before completing

2. **Return and Edit**
   - Click "Continue Editing" from dashboard
   - Navigate through all pages using the navigation bar
   - Verify data persists across all steps

3. **Multiple Resume Test**
   - Create multiple resumes with different details
   - Verify each has unique ID in console logs
   - Verify no data mixing between resumes

4. **Form Validation Test**
   - Try clicking "Save and Continue" with empty required fields
   - Verify buttons are disabled when required fields are missing
   - Fill in required fields and verify button becomes enabled

5. **Navigation State Test**
   - **Completed steps** should be clickable (green checkmark)
   - **Current step** should be highlighted (blue background)
   - **Future steps** should be disabled (gray, not clickable)
   - **URL parameters** should be preserved when navigating

## Console Debug Messages to Look For

### Successful Save:
```
=== SAVE AND CONTINUE DEBUG ===
Current resumeId: resume-user_XXX-navy-AB-e4
Stable resumeId: resume-user_XXX-navy-AB-e4
User ID: user_XXX
Branch: navy
MOS: AB
Rank: e4
About to save experience data: {id: "resume-...", militaryExperiences: [...], civilianExperiences: [...]}
Military experiences to save: [{id: "exp_...", branch: "navy", mos: "AB", ...}]
Civilian experiences to save: [{id: "exp_...", company: "Tech Corp", ...}]
Military experiences count: 2
Civilian experiences count: 1
Experience saved with ID: resume-user_XXX-navy-AB-e4
Military experiences saved: 2
Civilian experiences saved: 1
Verification - loaded saved data: {id: "resume-...", militaryExperiences: [...], ...}
Verification - military experiences count in saved data: 2
Verification - civilian experiences count in saved data: 1
Direct localStorage check - key: resume-resume-user_XXX-navy-AB-e4
Direct localStorage check - data: {...}
Direct localStorage check - parsed data: {...}
Direct localStorage check - military experiences: [...]
Direct localStorage check - civilian experiences: [...]
=== END SAVE AND CONTINUE DEBUG ===
```

### Data Loading:
```
=== LOADING EXPERIENCE DATA DEBUG ===
Loading military experience data for resumeId: resume-user_XXX-navy-AB-e4
Current user ID: user_XXX
Loaded military experience data: {...}
Setting form data from saved experience:
- Personal Info: {firstName: "John", lastName: "Doe", email: "..."}
- Military Experiences: [{id: "exp_...", branch: "navy", ...}]
- Civilian Experiences: [{id: "exp_...", company: "Tech Corp", ...}]
Form fields set to:
- firstName: John
- lastName: Doe
- email: john@example.com
- militaryExperiences count: 2
- civilianExperiences count: 1
=== END LOADING EXPERIENCE DATA DEBUG ===
```

### Issues to Report:
1. **No console logs**: Save functionality might not be working
2. **Empty data after returning**: Loading might be failing
3. **Duplicate resumes**: ID generation might be inconsistent
4. **Data mixing**: Resume isolation might be broken
5. **Button not working**: Required field validation might be off
6. **Navigation not working**: URL parameters might not be preserved
7. **Missing experiences**: Only one experience shows instead of multiple
8. **Missing education/skills**: Education or skills not appearing in review
9. **Verification logs missing**: No "Verification - loaded saved data" messages

## Expected Behavior
- ✅ "Save and Continue" buttons are enabled only when required fields are filled
- ✅ Data saves only when user clicks "Save and Continue"
- ✅ **Completed step titles are clickable** and preserve all data
- ✅ **Current step is highlighted** in the navigation bar
- ✅ **Future steps are disabled** until previous steps are completed
- ✅ Returning from dashboard preserves all data
- ✅ Each resume has unique, stable ID
- ✅ No data loss when navigating between pages
- ✅ Console shows clear debug information

## Browser Developer Tools
1. Open **Console tab** (F12)
2. Filter by "resume" to see relevant logs
3. Check **Application > Local Storage** to see saved data
4. Look for keys starting with "resume-"
5. **Network tab** - verify URL parameters are preserved in navigation

## Button Status Indicators
- **Disabled (Gray)**: Required fields are missing
- **Enabled (Green)**: All required fields are filled, ready to save
- **After Click**: Should navigate to next step immediately

## Navigation Status Indicators
- **Green Checkmark**: Step completed, clickable
- **Blue Background**: Current step, clickable
- **Gray Number**: Future step, not clickable
- **Hover Effects**: Scale animation on completed steps

## Reporting Issues
If save functionality or navigation doesn't work:
1. Provide console error messages
2. Describe exact steps that failed
3. Note which browser you're using
4. Include any localStorage keys you see in Application tab
5. Specify if button was enabled or disabled when clicked
6. **Check if URL parameters are preserved** when clicking navigation 