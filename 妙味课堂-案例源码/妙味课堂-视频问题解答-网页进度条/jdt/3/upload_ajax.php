<?php
/*
 * upload_ajax.php
 * zmouse@vip.qq.com
*/

//print_r($_POST['file']);

if (isset($_POST['file']) && !empty($_POST['file'])) {
	$file = $_POST['file'];
}

$s = stripos($file, ',') + 1;

$type_data = substr($file, 0, $s);
$type = substr($type_data, 5, stripos($type_data,';')-5);

$data = substr($file, $s);

switch($type) {
	case 'image/jpeg':
		$suffix = '.jpg';
		break;
	case 'image/png':
		$suffix = '.png';
		break;
	case 'image/gif':
		$suffix = '.gif';
		break;
	case 'text/plain':
		$suffix = '.txt';
		break;
	case 'application/x-javascript':
		$suffix = '.js';
		break;
	case 'application/rar':
		$suffix = '.rar';
		break;
	case 'application/zip':
		$suffix = '.zip';
		break;
}
$save_file = './upload/'.time().$suffix;

/*echo $save_file;*/
$fcontent = base64_decode($data);
file_put_contents($save_file, $fcontent);

echo $save_file;

/*
switch($type) {
	case 'image/jpeg':
	case 'image/png':
	case 'image/gif':
		echo '<img src="'.$save_file.'" />';
		break;
	case 'text/plain':
	case 'application/x-javascript':
	case 'application/rar':
	case 'application/zip':
		echo '<a href="'.$save_file.'">'.$save_file.'</a>';
		break;
	default:
		echo '未知类型：'.$save_file;
		break;
}
*/