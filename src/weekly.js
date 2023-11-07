/////////////////////////////POST

////////////////////////////////////////////GETTTTTT
// HTML tablosunu seçin
const taskTable = document.getElementById('task-table');
const taskList = document.getElementById('task-list');

// Her görev için bir satır oluşturun ve tabloya ekleyin
function getTask() {
    // Verileri localStorage'dan alın
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Görev listesini temizle
    taskList.innerHTML = '';
  
    // Sadece "Daily" türündeki görevleri filtrele
    const weeklyTasks = tasks.filter(taskData => taskData.type === 'Weekly');
  
    // Her görev için bir satır oluşturun ve tabloya ekleyin
    weeklyTasks.forEach((taskData, index) => {
      const row = document.createElement('tr');
  
      // Verileri tabloya ekleyin
      row.innerHTML = `
        <td>${taskData.type}</td>
        <td>${taskData.name}</td>
        <td>${taskData.description}</td>
        <td>${taskData.date}</td>
        <td>${taskData.status}</td>
      `;
  
      // Satırı tabloya ekleyin
      taskList.appendChild(row);
    });
  }
  
////////////////////////////DELETEEEEEEEEEEE
// Silme işlemi için bir işlev ekleyin
function deleteTask(index) {
  // Verileri localStorage'dan alın
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Belirtilen indeksteki görevi kaldırın
  tasks.splice(index, 1);

  // Güncellenmiş görev listesini localStorage'a kaydedin
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Tabloyu güncelleyin
  getTask();
}
////////////////////////////////////EDİTTTTTTTTTTTTTTTTTTTT
function editTask(index) {
  // Verileri localStorage'dan alın
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Seçilen görevin verilerini alın
  const selectedTaskData = tasks[index];

  // Düzenleme modalını açın ve seçilen görevin verilerini doldurun
  const editTypeInput = document.getElementById('edit-type');
  const editNameInput = document.getElementById('edit-name');
  const editDescriptionInput = document.getElementById('edit-description');
  const editDateInput = document.getElementById('edit-date');
  const statusRadio = document.querySelectorAll('input[name="status"]');

  editTypeInput.value = selectedTaskData.type;
  editNameInput.value = selectedTaskData.name;
  editDescriptionInput.value = selectedTaskData.description;
  editDateInput.value = selectedTaskData.date;

  for (const radio of statusRadio) {
    if (radio.value === selectedTaskData.status) {
      radio.checked = true;
    } else {
      radio.checked = false;
    }

  // Edit modalını aç
  const editModal = document.getElementById('edit-modal');
  editModal.style.display = 'block';

  // "Save" düğmesine tıklanınca çalışacak işlevi güncelle
  const editSaveButton = document.getElementById('edit-save');
  editSaveButton.onclick = function () {
    // Kullanıcının seçtiği "Status" değerini bulma
    let selectedStatus;
    for (const radio of statusRadio) {
      if (radio.checked) {
        selectedStatus = radio.value;
        break;
      }
    }

    // Kullanıcının girdilerini güncelle
    selectedTaskData.type = editTypeInput.value;
    selectedTaskData.name = editNameInput.value;
    selectedTaskData.description = editDescriptionInput.value;
    selectedTaskData.date = editDateInput.value;
    selectedTaskData.status = selectedStatus;

    // Verileri güncellenmiş haliyle localStorage'a kaydet
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Modalı kapat
    editModal.style.display = 'none';

    // Tabloyu güncelle
    getTask();
  };
}
// "Close" düğmesine tıklanınca edit modal penceresini kapatma
const editCloseButton = document.getElementById('edit-close');
editCloseButton.addEventListener('click', function () {
  const editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
});

}
getTask();
