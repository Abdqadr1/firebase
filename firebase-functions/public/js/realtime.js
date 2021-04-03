//vue instance
var app = new Vue({
    el: '#app',
    data: {
      requests: []
    }, 

    methods:{
        upvoteRequest(id){
            console.log(id);
            const upvote = firebase.functions().httpsCallable("upvote");

            upvote({requestId: id}).catch(err =>{
                showNotification(err.message);
            })
        }
    },
    mounted(){
        // real time firestore listener
        const store = firebase.firestore().collection("requests").orderBy("upvote", "desc");
        store.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
                requests.push({...doc.data(), id: doc.id});
            });
            this.requests = requests;
        });
    }
  })

