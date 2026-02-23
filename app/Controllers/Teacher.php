<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;
use App\Models\LogModel;
use App\Models\TeacherModel;

class Teacher extends Controller
{
    public function index(){
        $model = new TeacherModel();
        $data['teacher'] = $model->findAll();
        return view('teacher/index', $data);
    }
    public function save(){
        $name = $this->request->getPost('name');
        $bday = $this->request->getPost('bday');
        $address = $this->request->getPost('address');

        $model = new TeacherModel();
        $logModel = new LogModel();

        $data = [
            'name'       => $name,
            'bday'       => $bday,
            'address'    => $address
        ];

        if ($model->insert($data)) {
            $logModel->addLog('New Teacher has been added: ' . $name, 'ADD');
            return $this->response->setJSON(['status' => 'success']);
        } else {
            return $this->response->setJSON(['status' => 'error', 'message' => 'Failed to save Teacher']);
        }
    }



    public function fetchRecords()
    {
        $request = service('request');
        $model = new TeacherModel();

        $start = $request->getPost('start') ?? 0;
        $length = $request->getPost('length') ?? 10;
        $searchValue = $request->getPost('search')['value'] ?? '';

        $totalRecords = $model->countAll();
        $result = $model->getRecords($start, $length, $searchValue);

        $data = [];
        $counter = $start + 1;
        foreach ($result['data'] as $row) {
            $row['row_number'] = $counter++;
            $data[] = $row;
        }

        return $this->response->setJSON([
            'draw' => intval($request->getPost('draw')),
            'recordsTotal' => $totalRecords,
            'recordsFiltered' => $result['filtered'],
            'data' => $data,
        ]);
    }
}