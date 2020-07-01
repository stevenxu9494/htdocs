<?php
  $servername = "localhost";
  $username = "root";
  $password = "";
  $database = "aumake";
  
  // Create connection
  $conn = new mysqli($servername, $username, $password, $database);
  
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  // echo "Connected successfully";

  // get result
  $result = array('error' => false);
  $action = '';

  $action = isset($_GET['action']) ? $_GET['action'] :NULL;

  if($action == 'read'){
    $sql = $conn->query("SELECT * FROM users");
    $users = array();
    while($row=$sql->fetch_assoc()){
      array_push($users, $row);
    }
    $result['users'] = $users;
  }
  echo json_encode($result);
  if($action == 'create'){
    $name = $_POST['name'];
    $address = $_POST['address'];
    $mobile = $_POST['mobile'];

    $sql = $conn->query("INSERT INTO users (name,address,mobile) VALUES('$name', '$address', '$mobile')");

    if($sql) {
      $result['message'] = "User added successfully!";
    }
    else {
      $result['error'] = true;
      $result['message'] = "Failed to add user!";
    }
  }

  if($action == 'update'){
    $id = $_POST['id'];
    $name = $_POST['name'];
    $address = $_POST['address'];
    $mobile = $_POST['mobile'];
    $sql = $conn->query("UPDATE users SET name='$name', address='$address', mobile='$mobile' WHERE id='$id'");
    if($sql) {
      $result['message'] = "User updated successfully!";
    }
    else {
      $result['error'] = true;
      $result['message'] = "Failed to update user!";
    }
  }

  if($action == 'delete'){
    $id = $_POST['id'];
    $sql = $conn->query("DELETE FROM users WHERE id='$id'");
    if($sql) {
      $result['message'] = "User deleted successfully!";
    }
    else {
      $result['error'] = true;
      $result['message'] = "Failed to delete user!";
    }
  }

  $conn->close();
  
?>