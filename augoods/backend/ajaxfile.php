<?php

  include "config.php";

  
  // query
  $sql = "SELECT * FROM products";
  $result = $conn->query($sql);

  $arr = array();
  // 输出每行数据
  while($row = $result->fetch_assoc()) {
    $count=count($row);//不能在循环语句中，由于每次删除row数组长度都减小
    for($i=0;$i<$count;$i++){
        unset($row[$i]);//删除冗余数据
    }
    array_push($arr,$row);

  }
  //print_r($arr);
  echo json_encode($arr,JSON_UNESCAPED_UNICODE);//json编码
  $conn->close();

?>