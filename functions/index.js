const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);



exports.totalVotes = functions.firestore
    .document('groups/{groupId}/questions/{questionId}/options/{optionId}/likes/{userId}')
    .onUpdate((change, context) => {
        var newLike = change.after.data().like;   
        var previousLike = 0;
        if (change.before.data() !== undefined) {
            previousLike = change.before.data().like;
        } 
        
        var like = newLike - previousLike

        var optionLikesRef = db.collection('groups').doc(context.params.groupId)
            .collection('questions').doc(context.params.questionId)
            .collection('options').doc(context.params.optionId);



        // return optionLikesRef.child('totalVotes').transaction(totalVotes=> {
        //     return totalVotes + newLike;
        // });

        return db.runTransaction(transaction => {
            return transaction.get(optionLikesRef).then(optionDoc => {
                // Compute new number of ratings
                var totalVotes = 0;
                if (optionDoc.data().totalVotes !== undefined) {
                    totalVotes = optionDoc.data().totalVotes + like;
                } else {
                    totalVotes = newLike;
                }

                //calaculate consensus precentage:
                var consensusPrecentage = 1;
                if (optionDoc.data().totalVoters !== undefined) {
                    let totalVoters = optionDoc.data().totalVoters;
                    consensusPrecentage = totalVotes / totalVoters;
                }

                // Compute new average rating
                // var oldRatingTotal = optionDoc.data('avgRating') * optionDoc.data('numRatings');
                // var newAvgRating = (oldRatingTotal + newLike) / newNumRatings;

                // Update restaurant info
                return transaction.update(optionLikesRef, {
                    totalVotes,
                    consensusPrecentage
                });
            })
        })
    })

exports.totalVoters = functions.firestore
    .document('groups/{groupId}/questions/{questionId}/options/{optionId}/likes/{userId}')
    .onCreate((change, context) => {
        var newLike = change.data().like;

        var optionLikesRef = db.collection('groups').doc(context.params.groupId)
            .collection('questions').doc(context.params.questionId)
            .collection('options').doc(context.params.optionId);


        return db.runTransaction(transaction => {
            return transaction.get(optionLikesRef).then(optionDoc => {
                // Compute new number of ratings
                var totalVotes = newLike;
                if (optionDoc.data().totalVotes !== undefined) {
                    totalVotes = optionDoc.data().totalVotes + newLike;
                } 
                var totalVoters = 1;
                if (optionDoc.data().totalVoters !== undefined) {
                    totalVoters = optionDoc.data().totalVoters + 1;
                } 

                //calaculate consensus precentage: 
                var consensusPrecentage = totalVotes / totalVoters;  

                // Update restaurant info
                return transaction.update(optionLikesRef, {
                    totalVoters,
                    totalVotes,
                    consensusPrecentage
                });
            })
        })
    })



