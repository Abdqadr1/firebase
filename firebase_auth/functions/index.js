const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();


exports.addAdminRole = functions.https.onCall((data, context) =>{
    //check if request is made by an admin
    if(context.auth.token.admin !== true){
        return {error: 'only admins can add other admins, sucker'}
    }

    return admin.auth().getUserByEmail(data.email).then((user) =>{
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true,
            level: 7
        })
    }).then(()=>{
        return {
            message : `success! ${data.email} has been made an admin`
        }
    }).catch(err =>{
        return err;
    });
});

exports.upvote = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated",
        "Only authenticated users are allowed to upvote");
      }
    
       // get user id
       const user = admin.firestore().collection("users").doc(context.auth.uid);
       // get request id
       const request = admin.firestore().collection("requests").doc(data.requestId);
    
        //  get user
      const doc = await user.get();
      // check if user has upvoted this request
      if (doc.data().upvotedOn.includes(data.requestId)) {
        throw new functions.https.HttpsError("failed-precondition",
          "You can only upvote this request once");
      }
    
      await user.update({
        upvotedOn: [...doc.data().upvotedOn, data.requestId],
      });
    
      return request.update({
        upvote: admin.firestore.FieldValue.increment(1),
      });
})

