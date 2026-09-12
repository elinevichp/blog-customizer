import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (props: {
	onApply: (state: ArticleStateType) => void;
}) => {
	const sidebarRef = useRef<HTMLElement>(null);

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [formState, setFormState] = useState(defaultArticleState);

	const updateOptions = (field: string, value: OptionType) => {
		setFormState({ ...formState, [field]: value });
	};

	const toggleVisible = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		props.onApply(formState);
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		props.onApply(defaultArticleState);
		setFormState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setIsSidebarOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleVisible} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={(value) => updateOptions('fontFamilyOption', value)}
					/>

					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name={'fontSize'}
						title={'Размер шрифта'}
						onChange={(value) => updateOptions('fontSizeOption', value)}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={(value) => updateOptions('fontColor', value)}
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={(value) => updateOptions('backgroundColor', value)}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={(value) => updateOptions('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};