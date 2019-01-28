const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

// exports.countVotes = functions.firestore
//     .document('groups/{groupId}/questions/{questionId}/options/{optionId}/likes/{userId}')
//     .onWrite((change, context) => {
//         var newLike = change.after.data();
//         console.log(newLike);
//         var optionLikesRef = db.collection('groups').doc(context.params.groupId)
//             .collection('questions').doc(context.params.questionId)
//             .collection('options').doc(context.params.optionId);
        
        

//         return optionLikesRef.child('totalVotes').transaction(totalVotes=> {
//             return totalVotes + newLike;
//         });

        // return db.runTransaction(transaction => {
        //     return transaction.get(optionRef).then(optionDoc => {
        //         // Compute new number of ratings
        //         var newNumRatings = optionDoc.data('numRatings') + 1;

        //         // Compute new average rating
        //         var oldRatingTotal = optionDoc.data('avgRating') * optionDoc.data('numRatings');
        //         var newAvgRating = (oldRatingTotal + newLike) / newNumRatings;

        //         // Update restaurant info
        //         return transaction.update(optionDoc, {
        //             avgRating: newAvgRating,
        //             numRatings: newNumRatings
        //         });
        //     })
        // })
    // })



