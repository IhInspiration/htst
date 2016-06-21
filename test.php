<?php
$data = [
    "data" => [
    [
        "1",
        "Tiger Nixon",
        "System Architect",
        "1",
        "2011/04/25",
        "2011/04/25",
        "type3"
    ],
    [
        "2",
        "Garrett Winters",
        "Director",
        "2",
        "2011/07/25",
        "2011/07/25",
        "type2"
    ],
    [
        "3",
        "Garrett Winters",
        "Director",
        "3",
        "2011/07/25",
        "2011/07/25",
        "type1"
    ]
],
"length" => "3"
];
//可根据获取这些条件，然后进行使用
//$search = $_GET['extra_search'][0]['value'];
//echo $search;
echo json_encode($data);
