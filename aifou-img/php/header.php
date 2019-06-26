<?php
header('Content-Type: application/json;charset=UTF-8');
header('Access-Control-Allow-Origin:*');//只要客户端跨域请求携带了身份认证信息，此处就不允许使用*
header('Access-Control-Allow-Credentials:true');//允许客户端请求中携带会话身份验证信息