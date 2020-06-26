var app = new Vue({
  el: '#app',
  data: {
    errorMsg: "",
    successMsg: "",
    showAddModal: false,
    showEditModal: false,
    showDeleteModal:false,
    users:[],
    newUser:{name:"", address:"", mobile:""},
    currentUser:{}
  },

  mounted: function() {
    this.getAllUsers();
  },

  methods:{
    getAllUsers() {
      axios.get("http://localhost:8000/CRUD/process.php?action=read").then(function(response){
        if(response.data.error){
          app.errorMsg = response.data.message;
        }
        else{
          app.users=response.data.users;
        }
      });
    },
    // add new user
    addUser(){
      var formData = app.toFormData(app.newUser);
      axios.post("http://localhost:8000/CRUD/process.php?action=create", formData).then(function(response){
        app.newUser = {name: "", address: "", mobile:""};
        if(response.data.error){
          app.errorMsg = response.data.message;
        }
        else{
          app.successMsg = response.data.message;
          app.getAllUsers();
        }
      });
    },

    // update user
    updateUser(){
      var formData = app.toFormData(app.currentUser);
      axios.post("http://localhost:8000/CRUD/process.php?action=update", formData).then(function(response){
        app.currentUser = {};
        if(response.data.error){
          app.errorMsg = response.data.message;
        }
        else{
          app.successMsg = response.data.message;
          app.getAllUsers();
        }
      });
    },

    // update user
    deleteUser(){
      var formData = app.toFormData(app.currentUser);
      axios.post("http://localhost:8000/CRUD/process.php?action=delete", formData).then(function(response){
        app.currentUser = {};
        if(response.data.error){
          app.errorMsg = response.data.message;
        }
        else{
          app.successMsg = response.data.message;
          app.getAllUsers();
        }
      });
    },
    // a helper in order to get data and append to this object
    toFormData(obj){
      var fd = new FormData();
      for(var i in obj){
        fd.append(i, obj[i]);
      }
      return fd;
    },
    // a helper to select current user
    selectUser(user){
      app.currentUser = user;
    },
    clearMsg(){
      app.errorMsg = "";
      app.successMsg = "";
    }
  }
})