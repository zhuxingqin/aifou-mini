<?php
require_once('./header.php');
require_once('./init.php');
@$pid = $_REQUEST['pid'];
$output=[
	"data"=>null,
	"spec"=>null,
	"pimg"=>null,
	"simg"=>null
];
if(!$pid){
  $pid = 1;
};
$sql="SELECT * FROM products WHERE pid='$pid'";
$result = mysqli_query($conn, $sql);
$output["data"] = mysqli_fetch_assoc($result);
$sql="SELECT * FROM product_spec WHERE pid='$pid'";
$result = mysqli_query($conn, $sql);
$output["spec"] = mysqli_fetch_all($result,1);
$sql="SELECT * FROM pimg WHERE pid='$pid'";
$result = mysqli_query($conn, $sql);
$output["pimg"] = mysqli_fetch_all($result);
$sql="SELECT * FROM simg WHERE pid='$pid'";
$result = mysqli_query($conn, $sql);
$output["simg"] = mysqli_fetch_all($result,1);
echo json_encode($output);