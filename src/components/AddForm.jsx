import React from 'react';
import { withHandlers } from 'recompose';
import axios from '../axios';

const serializeForm = () => {
	const props = {};
	[...document.querySelectorAll('.add-form input, .add-form textarea')].forEach(
		input => {
			const name = input.getAttribute('id').split('.');
			if (name[1]) {
				if (!props[name[0]]) {
					props[name[0]] = {};
				}
				props[name[0]][name[1]] = input.value;
			} else {
				props[name[0]] = input.value;
			}
		}
	);
	return props;
};

const AddForm = ({ submitPattern }) => {
	return (
		<div className="add-form">
			<h2>Добавить паттерн</h2>
			<input
				className="add-form__field"
				type="text"
				placeholder="Заголовок (RUS)"
				id="title.ru"
			/>
			<textarea
				className="add-form__field"
				cols="30"
				rows="10"
				placeholder="Описание (RUS)"
				id="description.ru"
			/>
			<input
				className="add-form__field"
				type="text"
				placeholder="Заголовок (ENG)"
				id="title.en"
			/>
			<textarea
				className="add-form__field"
				cols="30"
				rows="10"
				placeholder="Описание (ENG)"
				id="description.en"
			/>
			<input
				className="add-form__field"
				type="text"
				placeholder="Паттерн"
				id="pattern"
			/>
			<input
				className="add-form__field"
				type="text"
				placeholder="Подсказка"
				id="placeholder"
			/>
			<input
				className="add-form__field"
				type="text"
				placeholder="Тэги"
				id="tags"
			/>
			<input
				className="add-form__field"
				type="text"
				placeholder="Никнейм"
				id="nickname"
			/>
			<input
				className="add-form__field"
				type="number"
				placeholder="Приоритет"
				id="prioritet"
			/>
			<div onClick={submitPattern} className="button button--green">
				Добавить
			</div>
		</div>
	);
};

export default withHandlers({
	submitPattern: () => () => {
		const postData = serializeForm();
		axios
			.post('http://5b3757f86223c40014605837.mockapi.io/new_patterns', postData)
			.then(() => {
				alert('Паттерн добавлен');
			})
			.catch(() => alert('Ошибка при добавлении паттерна'));
	}
})(AddForm);
