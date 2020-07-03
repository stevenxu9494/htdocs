<?php

  include "config.php";

  
  // query
  $sql = "SELECT * FROM products";
  $result = $conn->query($sql);
  $response = array();
  $arr = array();

  // 输出每行数据
  while($row = $result->fetch_assoc()) {
    $count=count($row);//不能在循环语句中，由于每次删除row数组长度都减小
    for($i=0;$i<$count;$i++){
        unset($row[$i]);//删除冗余数据
    }
    array_push($arr,$row);
  }
  // print_r($arr);
  // reponse添加products所有object
  $response['products'] = $arr;
  $jsonResponse = json_encode($response,JSON_UNESCAPED_UNICODE);//json编码
  echo $jsonResponse;
  $conn->close();

  $fp = fopen('response.json', 'w');
  fwrite($fp, $jsonResponse);
  fclose($fp);

?>