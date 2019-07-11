const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);



exports.totalLikes = functions.firestore
    .document('groups/{groupId}/questions/{questionId}/subQuestions/{subQuestionId}/options/{optionId}/likes/{userId}')
    .onUpdate((change, context) => {
        var newLike = change.after.data().like;
        var previousLike = 0;
        if (change.before.data() !== undefined) {
            previousLike = change.before.data().like;
        }

        var like = newLike - previousLike

        var optionLikesRef = db.collection('groups').doc(context.params.groupId)
            .collection('questions').doc(context.params.questionId)
            .collection('subQuestions').doc(context.params.subQuestionId)
            .collection('options').doc(context.params.optionId);



        return db.runTransaction(transaction => {
            return transaction.get(optionLikesRef).then(optionDoc => {
                // Compute new number of ratings
                var totalLikes = 0;
                if (optionDoc.data().totalLikes !== undefined) {
                    totalLikes = optionDoc.data().totalLikes + like;
                } else {
                    totalLikes = newLike;
                }

                //calaculate consensus precentage:
                var consensusPrecentage = 1;
                if (optionDoc.data().totalVoters !== undefined) {
                    let totalVoters = optionDoc.data().totalVoters;
                    consensusPrecentage = totalLikes / totalVoters;
                }

                // Compute new average rating
                // var oldRatingTotal = optionDoc.data('avgRating') * optionDoc.data('numRatings');
                // var newAvgRating = (oldRatingTotal + newLike) / newNumRatings;

                // Update restaurant info
                return transaction.update(optionLikesRef, {
                    totalLikes,
                    consensusPrecentage
                });
            })
        })
    })

exports.totalVoters = functions.firestore
    .document('groups/{groupId}/questions/{questionId}/subQuestions/{subQuestionId}/options/{optionId}/likes/{userId}')
    .onCreate((change, context) => {
        var newLike = change.data().like;

        var optionLikesRef = db.collection('groups').doc(context.params.groupId)
            .collection('questions').doc(context.params.questionId)
            .collection('subQuestions').doc(context.params.subQuestionId)
            .collection('options').doc(context.params.optionId);


        return db.runTransaction(transaction => {
            return transaction.get(optionLikesRef).then(optionDoc => {
                // Compute new number of ratings
                var totalLikes = newLike;
                if (optionDoc.data().totalLikes !== undefined) {
                    totalLikes = optionDoc.data().totalLikes + newLike;
                }
                var totalVoters = 1;
                if (optionDoc.data().totalVoters !== undefined) {
                    totalVoters = optionDoc.data().totalVoters + 1;
                }

                //calaculate consensus precentage: 
                var consensusPrecentage = totalLikes / totalVoters;

                // Update restaurant info
                return transaction.update(optionLikesRef, {
                    totalVoters,
                    totalLikes,
                    consensusPrecentage
                });
            })
        })
    })


exports.totalLikesForSubQuestion = functions.firestore
    .document('groups/{groupId}/questions/{questionId}/subQuestions/{subQuestionId}/likes/{userId}')
    .onUpdate((change, context) => {
        var newLike = change.after.data().like;
        var previousLike = 0;
        if (change.before.data() !== undefined) {
            previousLike = change.before.data().like;
        }

        var like = newLike - previousLike;

        var subQuestionLikesRef = db.collection('groups').doc(context.params.groupId)
            .collection('questions').doc(context.params.questionId)
            .collection('subQuestions').doc(context.params.subQuestionId);


        return db.runTransaction(transaction => {
            return transaction.get(subQuestionLikesRef).then(subQuestionDoc => {
                // Compute new number of ratings
                var totalLikes = 0;
                if (subQuestionDoc.data().totalLikes !== undefined) {
                    totalLikes = subQuestionDoc.data().totalLikes + like;
                } else {
                    totalLikes = like;
                }

                // Update restaurant info
                return transaction.update(subQuestionLikesRef, {
                    totalLikes

                });
            })
        })
    })


// exports.totalLikesForQuestionsGoals = functions.firestore
//     .document('groups/{groupId}/questions/{questionId}/goals/{subGoalId}/likes/{userId}')
//     .onUpdate((change, context) => {
//         var newLike = change.after.data().like;
//         var previousLike = 0;
//         if (change.before.data() !== undefined) {
//             previousLike = change.before.data().like;
//         }

//         var like = newLike - previousLike;

//         var subGoalLikesRef = db.collection('groups').doc(context.params.groupId)
//             .collection('questions').doc(context.params.questionId)
//             .collection('goals').doc(context.params.subGoalId);


//         return db.runTransaction(transaction => {
//             return transaction.get(subGoalLikesRef).then(subGoalDoc => {
//                 // Compute new number of ratings
//                 var totalLikes = 0;
//                 if (subGoalDoc.data().totalLikes !== undefined) {
//                     totalLikes = subGoalDoc.data().totalLikes + like;
//                 } else {
//                     totalLikes = like;
//                 }

//                 // Update restaurant info
//                 return transaction.update(subGoalLikesRef, {
//                     totalLikes

//                 });
//             })
//         })
//     })


// exports.totalLikesForQuestionsValues = functions.firestore
//     .document('groups/{groupId}/questions/{questionId}/values/{subValueId}/likes/{userId}')
//     .onUpdate((change, context) => {
//         var newLike = change.after.data().like;
//         var previousLike = 0;
//         if (change.before.data() !== undefined) {
//             previousLike = change.before.data().like;
//         }

//         var like = newLike - previousLike;

//         var subValueLikesRef = db.collection('groups').doc(context.params.groupId)
//             .collection('questions').doc(context.params.questionId)
//             .collection('values').doc(context.params.subValueId);


//         return db.runTransaction(transaction => {
//             return transaction.get(subValueLikesRef).then(subGoalDoc => {
//                 // Compute new number of ratings
//                 var totalLikes = 0;
//                 if (subGoalDoc.data().totalLikes !== undefined) {
//                     totalLikes = subGoalDoc.data().totalLikes + like;
//                 } else {
//                     totalLikes = like;
//                 }

//                 // Update restaurant info
//                 return transaction.update(subValueLikesRef, {
//                     totalLikes

//                 });
//             })
//         })
//     })


exports.countNumbeOfMessages =
    functions.firestore.document('groups/{groupId}/questions/{questionId}/subQuestions/{subQuestionId}/options/{optionId}/messages/{messageId}')
        .onWrite((change, context) => {
            let docRef = db.collection('groups').doc(context.params.groupId)
                .collection('questions').doc(context.params.questionId)
                .collection('subQuestions').doc(context.params.subQuestionId)
                .collection('options').doc(context.params.optionId);

            if (!change.before.exists) {
                // New document Created : add one to count
                docRef.get().then(snap => {

                    //check if new 
                    let numberOfMessages = 0;
                    if (isNaN(snap.data().numberOfMessages)) {
                        numberOfMessages = 1
                    } else {
                        numberOfMessages = snap.data().numberOfMessages + 1;
                    }
                    docRef.update({ numberOfMessages });
                    return true;
                }).catch(err => { console.log(err) });

            } else if (change.before.exists && change.after.exists) {
                // Updating existing document : Do nothing
                return true;

            } else if (!change.after.exists) {
                // Deleting document : subtract one from count
                docRef.get().then(snap => {
                    docRef.update({ numberOfMessages: snap.data().numberOfMessages - 1 });
                    return true;
                }).catch(err => { console.log(err) });
            }

        });


        export const countVotes = 
    functions.firestore.document('collection/{documentUid}')
    .onWrite((change, context) => {

    if (!change.before.exists) {
        // New document Created : add one to count

        db.doc(docRef).update({numberOfDocs: FieldValue.increment(1)});

    } else if (change.before.exists && change.after.exists) {
        // Updating existing document : Do nothing

    } else if (!change.after.exists) {
        // Deleting document : subtract one from count

        db.doc(docRef).update({numberOfDocs: FieldValue.increment(-1)});

    }

return;
});
