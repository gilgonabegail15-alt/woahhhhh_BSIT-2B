<h2>Edit Parents</h2>
<form action="/parents/update/<?= $parents['id'];?> method="post">
<label> Name</label><br>
    <input type="text" name="name" value="<?=$parents ['name']; ?>" required><br><br>
    <label> Name</label><br>
    <input type="text" name="gender" value="<?=$parents ['gender']; ?>" required><br><br>
    <label> Name</label><br>
    <input type="text" name="address" value="<?=$parents ['address']; ?>" required><br><br>
    <button type="submit">Update</button>
</form>
<br>
<a href="'/parents">Back</a>