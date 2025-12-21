# Firebase Security Rules Setup

## IMPORTANT: Set These Rules in Your Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `newweb050-portfolio`
3. Click **"Firestore Database"** in left sidebar
4. Click the **"Rules"** tab
5. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{reviewId} {
      // Anyone can read APPROVED reviews only
      allow read: if resource.data.approved == true;
      
      // Anyone can create reviews (they start as unapproved)
      allow create: if request.resource.data.approved == false;
      
      // Only authenticated admin can update/delete
      allow update, delete: if false;
    }
  }
}
```

6. Click **"Publish"**

## How Manual Approval Works

### When a customer submits a review:
1. Review is saved to Firebase with `approved: false`
2. Customer sees: "Thank you for your review! It will appear after approval."
3. Review does NOT appear on the website yet

### To approve a review (you do this):
1. Go to Firebase Console → Firestore Database → `reviews` collection
2. Click on the review document you want to approve
3. Find the `approved` field
4. Change it from `false` to `true`
5. Click **Save**
6. The review will now appear on your website!

### To reject/delete spam:
1. Go to Firebase Console → Firestore Database → `reviews` collection
2. Click the three dots next to the review
3. Click **Delete document**

## Security Benefits

✅ **Prevents spam** - Fake reviews never go live
✅ **Quality control** - You choose which reviews to show
✅ **No automatic abuse** - Bots can submit but won't affect your site
✅ **Your data is safe** - Nobody can edit or delete without console access

## Quota Monitoring

Free tier limits:
- 50,000 reads/day
- 20,000 writes/day

To check usage:
1. Firebase Console → Firestore Database
2. Click "Usage" tab

If you hit limits, Firebase will simply reject additional requests (not charge you).
