<?php
/**
* 分页显示所有的商品
*/
require_once('./header.php');
@$pageSize = $_REQUEST['pageSize'];
if(!$pageSize){
  $pageSize=5;
}else{
  $pageSize = intval($pageSize);
}
$output = [
  'recordCount' => 0,     //满足条件的总记录数
  'pageSize' => $pageSize,        //每页大小，即每页最多可以显示的记录数量
  'pageCount' => 0,       //总页数
  'pno' => 1,          //当前数据所在页号
  'data' => null          //当前页中的数据
];
require_once('./init.php');
//获取总记录数
$sql = "SELECT COUNT(*) FROM ad_products";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);
$output['recordCount'] = intval($row[0]);

//计算总页数
$output['pageCount'] = ceil($output['recordCount']/$output['pageSize']);

//获取指定页中的数据
$start = ($output['pno']-1)*$output['pageSize'];
$count = $output['pageSize'];
$sql = "SELECT * FROM ad_products " . "LIMIT $start,$count";
$result = mysqli_query($conn,$sql);

if(!$result){       //SQL语句执行失败
  echo('{"code":500, "msg":"db execute err"}');
}else {
  $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
  $output['data'] = $data;
  echo json_encode($output);
}