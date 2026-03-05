<?php

namespace App\Controllers;

use App\Models\ParentsModel;
use CodeIgniter\Controller;

class Parents extends Controller
{
    public function index(){
        $model = new ParentsModel();
        $data['parents'] = $model->findAll();
        return view('parents/index', $data);
    }

    public function create(){
        return view('parents/create');
    }
    public function save(){
        $model = new ParentsModel();
        $data=[
            'name'=>$this->request->getPost('name'),
            'gender'=>$this->request->getPost('gender'),
            'address'=>$this->request->getPost('address'),
        ];
        $model->insert($data);
        return redirect()->to('/parents');
    }

  public function edit($id){
        $model = new ParentsModel();
    $data = [
        'parents'=>$model->find($id)];
    return view('parents/edit', $data);
}

    public function update($id){
        $model = new ParentsModel();
       $data = [
        'name'=>$this->request->getPost('name'),
        'gender'=>$this->request->getPost('gender'),
        'address'=>$this->request->getPost('address'),
       ];
       $model->update($id, $data);
       return redirect()->to('/parents');
    }

  
public function delete($id){
    $model = new ParentsModel();
   $model->delete($id);
        return redirect()->to('/parents');                                     
 
}

}