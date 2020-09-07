// Создание таблицы
function createTable() 
{
	check = document.getElementById('table');
	
	if (!check)
	{
		var newTable = document.createElement('TABLE'); // создание нового элемента, где в качестве параметра имя тега, обозначающего таблицу
		newTable.id = 'table'; 
		newTable.width = '100%';
		newTable.cellspacing = '0';
		newTable.cellpadding = '5';
		newTable.border = '1';
		
		var newRow = document.createElement('TR'); // cоздание новой строки
		newTable.appendChild(newRow); // добавление строки в таблицу
		
		var newCell = document.createElement('TD'); // создание новой ячейки
		
		var textContent = 'Строка ' + 1 + ' Столбец ' + 1;
		newCell.appendChild(document.createTextNode(textContent)); // заполнение ячейки текстом
		
		newRow.appendChild(newCell); // добавление ячейки в строку
		
		document.body.appendChild(newTable); // добавление таблицы на страницу
		
		// alert('Таблица успешно создана');
	}
	else
	{
		alert('Таблица уже существует');
	}
}

//Удаление таблицы
function deleteTable() 
{
	table = document.getElementById('table');
	
	if (table)
	{	
		if (confirm("Bы уверены, что хотите удалить таблицу?"))
			table.parentNode.removeChild(table);
		
		// alert('Таблица успешно удалена');
	}
	else
	{
		alert('Таблица не существует');
	}
}

// Добавление строки
function addRow() 
{
	table = document.getElementById('table');
	
	if (table)
	{	
		var rowsArr = table.getElementsByTagName('TR');
		
		var newRow = document.createElement('TR');
		table.appendChild(newRow);
		
		var cellCount = rowsArr[0].cells.length; // берем число столбцов из первой строки таблицы
		for (var i = 0; i < cellCount; i++)
		{
			var newCell = document.createElement('TD');
			
			var textContent = 'Строка ' + rowsArr.length + ' Столбец ' + (i + 1);
			newCell.appendChild(document.createTextNode(textContent));
			
			newRow.appendChild(newCell);
		}
		
		// alert('Строка добавлена в таблицу');
	}
	else
	{
		alert('Таблица не существует');
	}
}

// Добавление столбца
function addColumn() 
{
	table = document.getElementById('table');
	
	if (table)
	{	
		var rowsArr = table.getElementsByTagName('TR');
		
		var rowCount = rowsArr.length; // берем число строк в таблице
        for (var i = 0; i < rowCount; i++)
		{
			var newCell = document.createElement('TD');
			var cellCount = table.rows[i].cells.length; // число столбцов в текущей строке

			var textContent = 'Строка ' + (i + 1) + ' Столбец ' + (cellCount + 1);
			newCell.appendChild(document.createTextNode(textContent));
			
			rowsArr[i].appendChild(newCell);
		}
		
		// alert('Столбец добавлен в таблицу');
	}
	else
	{
		alert('Таблица не существует');
	}
}
