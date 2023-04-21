import React, { FC, useEffect, FormEvent, ChangeEvent, useState } from 'react';

import { IApiProfile } from '@api';
import { useAppDispatch, useAppSelector, useAppNavigate } from '@hooks';
import { fetchProfiles, setPage, setSearch } from '@store';
import { Button, Input, Page, Pagination, CircularProgress } from '@components';

import { ProfileItem } from './ProfileItem';

import css from './pageprofiles.module.scss';

export const PageProfiles: FC = () => {
	const { list, page, pages, search, isLoading } = useAppSelector((state) => state.profiles);
	const dispatch = useAppDispatch();
	const navigate = useAppNavigate();

	const [searchText, setSearchText] = useState<string>(search);

	const onChangePage = (ev: any, value: number) => {
		if (value !== page) {
			dispatch(setPage(value));
			dispatch(fetchProfiles({ page: value, search }));
		}
	};

	const onChangeSearch = (ev: ChangeEvent<HTMLInputElement>) => {
		setSearchText(ev.target.value);
	};

	const onSearch = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		dispatch(setPage(1));
		dispatch(setSearch(searchText));
		dispatch(fetchProfiles({ page: 1, search: searchText }));
	};

	const onClickProfile = (profile: IApiProfile) => navigate(`profile/${profile.id}`);

	useEffect(() => {
		dispatch(fetchProfiles({ page, search }));
	}, []);

	return (
		<Page>
			<form className={css.search} onSubmit={onSearch}>
				<Input
					className={css.input}
					value={searchText}
					onChange={onChangeSearch}
					placeholder="Search"
					disabled={isLoading}
				/>
				<Button
					type="submit"
					className={css.btnsearch}
					disabled={isLoading}
				>search</Button>
			</form>
			<div className={css.list}>
				{list.map((iProfile, index) => (
					<ProfileItem
						profile={iProfile}
						onClick={onClickProfile}
						key={iProfile.id}
					/>
				))}
				{ isLoading && list.length === 0 ? <div className={css.loader}><CircularProgress /></div> : null }
			</div>
			{ pages && page ? (
				<div className={css.footer}>
					<Pagination
						page={page}
						count={pages}
						disabled={isLoading}
						onChange={onChangePage}
						color="primary"
					/>
				</div>
			) : null }
		</Page>
	);
};
