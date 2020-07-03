<?php

  include "config.php";

  // initialize returned value
  $response = array();
  
  // query all products
  $sql = "SELECT * FROM products";
  $result = $conn->query($sql);
  $products = array();

  // 输出每行数据
  while($row = $result->fetch_assoc()) {
    $count=count($row);//不能在循环语句中，由于每次删除row数组长度都减小
    for($i=0;$i<$count;$i++){
        unset($row[$i]);//删除冗余数据
    }
    array_push($products,$row);
  }
  // print_r($arr);

  // query categories
  $sql = "SELECT DISTINCT(category) FROM products";
  $result = $conn->query($sql);
  $categories = array();

  // 输出每行数据
  while($row = $result->fetch_assoc()) {
    $count=count($row);//不能在循环语句中，由于每次删除row数组长度都减小
    for($i=0;$i<$count;$i++){
        unset($row[$i]);//删除冗余数据
    }
    array_push($categories,$row);
  }
  

  // reponse添加products所有object
  $response['products'] = $products;
  $response['categories'] = $categories;
  $jsonResponse = json_encode($response,JSON_UNESCAPED_UNICODE);//json编码
  echo $jsonResponse;
  $conn->close();

  $fp = fopen('response.json', 'w');
  fwrite($fp, $jsonResponse);
  fclose($fp);

?>