<?php

  include "config.php";

  // fetch all products
  $sql = "SELECT * FROM products";
  $result = $conn->query($sql);
  $products = array();
  if ($result->num_rows > 0) {
    // echo "<table><tr><th>id</th><th>name</th><th>price</th><th>sellPrice</th><th>brand</th><th>category</th><th>sales</th><th>netWeight</th><th>unit</th><th>thumbUrl</th><th>imageUrl</th></tr>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
      // array_push($products,$row);
      $products[] = $row;
      echo json_encode($row);
      // echo "<tr><td>".$row["id"]."</td><td>".$row["name"]."</td><td>".$row["price"]."</td><td>".$row["sellPrice"]."</td><td>".$row["brand"]."</td><td>".$row["category"]."</td><td>".$row["sales"]."</td><td>".$row["netWeight"]."</td><td>".$row["unit"]."</td><td>".$row["thumbUrl"]."</td><td>".$row["imageUrl"]."</td></tr>";
    }
    // echo "</table>";
  } else {
    echo "0 results";
  }

  echo json_encode($products,'UTF'-8);
  $conn->close();
  // fetch products by category

?>