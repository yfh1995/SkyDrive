<?php
/**
 * Created by PhpStorm.
 * User: fuhao
 * Date: 2017/4/3
 * Time: 14:10
 */

return [
    'roles' =>  [
        'root'  =>  [
            'name'      =>  'root',
            'cn_name'   =>  '超级管理员'
        ],
        'admin' =>  [
            'name'      =>  'admin',
            'cn_name'   =>  '管理员'
        ],
        'user'  =>  [
            'name'      =>  'user',
            'cn_name'   =>  '用户'
        ]
    ],
    'storage_space_size'    =>  10*1024*1024*1024*1.0,
    'page_size'             =>  15
];