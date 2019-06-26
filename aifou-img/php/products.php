<?php
require_once('./header.php');
require_once('./init.php');
@$kw = $_REQUEST['kw'];
@$ptype=intval($_REQUEST['ptype']);
if($kw=='undefined' && $ptype=='undefined'){
  $sql="SELECT * FROM products";
}else if($kw!='undefined'){
  $sql="SELECT * FROM products WHERE title LIKE '%$kw%'";
}else if($ptype!='undefined'){
  if($ptype==1){
    $sql="SELECT * FROM products WHERE ptype = 1 OR ptype = 2";
  }else{
    $sql="SELECT * FROM products WHERE ptype = $ptype";
  }
}
$result = mysqli_query($conn, $sql);
$output = mysqli_fetch_all($result,1);
echo json_encode($output);