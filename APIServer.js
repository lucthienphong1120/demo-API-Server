
var coursesApi = 'http://localhost:3000/courses'

function start() {
	getCourses(renderCourses);
	handleCreateForm();
}
start()

// fetch để GET dữ liệu từ API và render ra giao diện
function getCourses(callback) {
	fetch(coursesApi)
		.then(function(response) {
			return response.json();
		})
		.then(callback)
}
function renderCourses(courses) { 
	var courseList = document.querySelector('#list-courses');
	var htmls = courses.map(function(course) {
		return `
			<li class="course-item-${course.id}">
				<h4 class="course-name">${course.name}</h4>
				<p class="course-desc">${course.desc}</p>
				<button onclick="handleDelete(${course.id})">Xoá</button>
				<button onclick="handleUpdateForm(${course.id})">Chỉnh sửa</button>  
			</li>
		`;
	})
	courseList.innerHTML = htmls.join('');
}

// dùng Fetch với POST
function createCourse(data, callback) {
	var request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(data)  
	}
	fetch(coursesApi, request)
		.then(function(response) {
			response.json()
		})
		.then(callback)
}
function handleCreateForm() {  
	var createBtn = document.querySelector('#create');
	createBtn.onclick = function() {
		var name = document.querySelector('input[name="name"]').value;
		var desc = document.querySelector('input[name="desc"]').value;
		
		var data = {
			name: name,
			desc: desc
		};
		createCourse(data, function() {
			getCourses(renderCourses);
		});
	}
// làm trống input sau khi tạo
	document.querySelector('input[name="name"]').value = '';
	document.querySelector('input[name="desc"]').value = '';
}
// dùng Fetch với DELETE
function handleDelete(id) {
	var request = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'}
	}
	fetch(coursesApi + '/' + id, request)
		.then(function(response) {
			response.json() 
		})
		.then(function() {
			var courseItem = document.querySelector('.course-item-' + id);
			if (courseItem) {
				courseItem.remove(); 
			}
		});
}
// sử dụng fetch với PUT
function updateCourse(id, data, callback) {
	var request = {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	}
	fetch(coursesApi + '/' + id, request)
		.then(function(response) {
			response.json() 
		})
		.then(callback)
}
function handleUpdateForm(id) {
// name, desc của course tự động thêm vào input
	document.querySelector('input[name="name"]').value = document.querySelector('.course-name-' + id).textContent;
	document.querySelector('input[name="desc"]').value = document.querySelector('.course-desc-' + id).textContent;

// nút Create thành nút Update
	var updateBtn = document.querySelector('#create');
	updateBtn.textContent = 'Update';

// tạo 3 đối số để truyền -> chạy hàm updateCourse
	updateBtn.onclick = function() {
		var name = document.querySelector('input[name="name"]').value;
		var desc = document.querySelector('input[name="desc"]').value;
		
		var data = {
			name: name,
			desc: desc
		};
		updateCourse(id, data, function(){
			getCourses(renderCourses);
		});

// làm trống input sau khi lưu
		document.querySelector('input[name="name"]').value = '';
		document.querySelector('input[name="desc"]').value = '';
	}
}
