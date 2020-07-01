<?php
$host="localhost";
$user="root";
$pass="";
$db="aumake";

//connect with database demo
$connect= new mysqli($host,$user,$pass,$db) or die("ERROR:could not connect to the database!!!");

//select all data from json table
$query="select * from products ";
$result=$connect->query($query);

//fetech all data from json table in associative array format and store in $result variable
$array=$result->fetch_assoc();

//Now encode PHP array in JSON string 
$json=json_encode($array,'UTF'-8);

//test the json string
echo $json;


?>