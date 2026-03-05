<?php
namespace App\Models;
use CodeIgniter\Model;

class ParentsModel extends Model{
    protected $table ='parents';
    protected $primarykey = 'id';
    protected $allowedFields = [
        'name',
        'gender',
       'address'
    ];
}