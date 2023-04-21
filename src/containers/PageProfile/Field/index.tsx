import React, { FC, useState, ChangeEvent } from 'react';

import { Input, TextField } from '@components';

import css from './field.module.scss';
import classnames from 'classnames';

interface IFieldProps {
	name: string;
	value: string;
	onChange: (name: string, value: string) => void;
}

export const Field: FC<IFieldProps> = ({ name, value, onChange }) => {
	const [fldValue, setFldValue] = useState(value);
	const [isEditMode, setIsEditMode] = useState(false);
	
	const onClickField = () => setIsEditMode(true);
	const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
		const newValue = ev.target.value;
		setFldValue(newValue);
	};

	const onBlur = () => {
		setIsEditMode(false);

		if (fldValue !== value) {
			onChange(name, fldValue);
			setFldValue(value);
		}
	};

	const onSubmit = (ev: ChangeEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setIsEditMode(false);

		if (fldValue !== value) {
			onChange(name, fldValue);
			setFldValue(value);
		}
	};

	return (
		<div className={classnames(css.field, { [css.iseditmode]: isEditMode })} onClick={onClickField}>
			<div className={css.name}>{name}:</div>
			<div className={css.value}>
				{
					isEditMode ? (
						<form onSubmit={onSubmit}>
							<Input
								className={css.input}
								value={fldValue}
								fullWidth
								onChange={onChangeInput}
								onBlur={onBlur}
								autoFocus={true}
							/>
						</form>
					) : (	
						<span className={css.valueview}>{value}</span>
					)
				}
			</div>
		</div>
	);
};
