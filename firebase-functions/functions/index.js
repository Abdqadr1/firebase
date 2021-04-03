const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.logActivities = functions.firestore.document("/{collection}/{id}")
    .onCreate((snap, context) => {
      const collection = context.params.collection;
      //   const id = context.params.id;
      console.log(snap.data());

      const activities = admin.firestore().collection("activities");

      if (collection == "requests") {
        return activities.add({text: "a new request added"});
      }
      if (collection == "users") {
        return activities.add({text: "a new user added"});
      }

      return;
    });
