/** @format */

// /** @format */

// import { useEffect, useState } from 'react';

// const useGet = urls => {
// 	const configServiceDefault = {
// 		method: 'GET',
// 		headers: { 'Content-Type': 'application/json' },
// 		mode: 'cors',
// 		cache: 'default'
// 	};

// 	const [data, setData] = useState(null);
// 	const [config] = useState(configServiceDefault);
// 	const [refresh, setRefresh] = useState(null);

// 	const getData = async () => {
// 		try {
// 			const data = await fetch(urls, config);
// 			if (data.ok) {
// 				setData(await data.json());
// 			}
// 			// setData(data);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	useEffect(() => {
// 		getData();
// 	}, [refresh]);

// 	return [data, setRefresh, setData];
// };

// const usePost = (url, data) => {
// 	const configDefault = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(data),
// 		mode: 'cors',
// 		cache: 'default'
// 	};

// 	const [data, setData] = useState(null);

// 	const setData = async () => {
// 		try {
// 			const data = await fetch(url, configDefault);
// 			if (data.ok) {
// 				setData(await data.json());
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	setData();

// 	return data;
// };

// const usePatch = (url, data) => {
// 	const configDefault = {
// 		method: 'PATCH',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(data),
// 		mode: 'cors',
// 		cache: 'default'
// 	};

// 	const [data, setData] = useState(null);

// 	const phatchData = async () => {
// 		try {
// 			const data = await fetch(url, configDefault);
// 			if (data.ok) {
// 				setData(await data.json());
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	phatchData();
// 	return data;
// };

// const useDelete = url => {
// 	const configDefault = {
// 		method: 'DELETE'
// 	};
// 	const [data, setData] = useState(null);

// 	const deleteData = async () => {
// 		try {
// 			const data = await fetch(url, configDefault);
// 			if (data.ok) {
// 				setData(await data.json());
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	deleteData();

// 	return data;
// };
// export { useGet, usePost, usePatch, useDelete };
