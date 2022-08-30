/**
 * @author 季悠然
 * @date 2022-08-09
 */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	IconPlus,
	IconDelete,
	IconEdit,
	IconSearch,
} from "@douyinfe/semi-icons";
import {
	TagGroup,
	Toast,
	Typography,
	Button,
	ButtonGroup,
	Col,
	Row,
	Space,
	SideSheet,
	Form,
	Table,
	Avatar,
	Input,
} from "@douyinfe/semi-ui";
import { AddGift, DelGift, QueryThingList, UpdateGift } from "../../api/admin";
import NumEditor from "../../components/admin/NumEditor";

export default function Dashboard() {
	const navi = useNavigate();
	const [addPanel, setAddPanel] = useState(false);
	const [editPanel, setEditPanel] = useState(false);
	const { Title } = Typography;
	const [newItem, setNewItem] = useState({});
	const [itemList, updateItemList] = useState([]);
	const [selectedList, setSelectedList] = useState([]);
	const [keyword, setKeyword] = useState("");

	const AddFormApi = useRef();
	const EditFormApi = useRef();

	/**
	 * 表格列定义
	 * @type {[{dataIndex: string, title: string, render: (function(*, *, *))},{dataIndex: string, title: string},{dataIndex: string, title: string},{dataIndex: string, title: string, render: (function(*))},{dataIndex: string, title: string, render: (function(*, *, *))},null]}
	 */
	const columns = [
		{
			title: "标题",
			dataIndex: "title",
			render: (text, record, index) => {
				return (
					<div className={"thing"}>
						<Avatar
							className={"img"}
							size="small"
							shape="square"
							src={record.path_img}
							style={{ marginRight: 12 }}
						></Avatar>
						<p
							style={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
						>
							{text}
						</p>
					</div>
				);
			},
			width: 200,
		},
		{
			title: "数量",
			dataIndex: "num",
			width: 100,
		},
		{
			title: "分类",
			dataIndex: "kind",
			width: 100,
		},
		{
			title: "状态",
			dataIndex: "is_active",
			render: (text, record) => (
				<div>{record.is_active ? "已上架" : "已下架"}</div>
			),
			width: 100,
		},
		{
			title: "标签",
			dataIndex: "labels",
			render: (text) => {
				const arr = [];
				text
					.slice(1, -1)
					.split("#")
					.forEach((e) => {
						arr.push({ children: e });
					});

				return (
					<div>
						<TagGroup tagList={arr} />
					</div>
				);
			},
			width: 100,
		},
		{
			title: "添加时间",
			dataIndex: "created_at",
			render: (text) => {
				return <span>{(new Date(text)).toLocaleDateString()}</span>;
			},
			width: 100,
		},
		{
			title: "修改时间",
			dataIndex: "updated_at",
			render: (text) => {
				return <span>{(new Date(text)).toLocaleDateString()}</span>;
			},
			width: 100,
		},
		{
			title: "数量操作",
			dataIndex: "numOperate",
			render: (text, record, index) => {
				return (
					<NumEditor record={record} index={index} handler={handleUpdateNum} />
				);
			},
			width: 100,
		},
		{
			title: "其他操作",
			dataIndex: "otherOperate",
			render: (text, record, index) => {
				return (
					<ButtonGroup>
						<Button
							icon={<IconEdit />}
							onClick={() => handleEditOpen(record, index)}
						/>
						<Button
							type={"danger"}
							icon={<IconDelete />}
							onClick={() => handleDelete(record, index)}
						/>
					</ButtonGroup>
				);
			},
			width: 100,
		},
	];

	/**
	 * 判断登录态并获取礼品列表
	 */
	useEffect(() => {
		if (!localStorage.getItem("access_token")) {
			Toast.info("请先登录");
			navi("/admin/login");
		} else {
			QueryThingList().then((res) => {
				if (res.data.code !== 200) {
					Toast.info(res.data.msg);
				} else {
					updateItemList(res.data.data);
				}
			});
		}
		// eslint-disable-next-line
	}, []);

	/**
	 * 参数判断
	 * @returns {string|boolean}
	 */
	const paramCheck = () => {
		const keys = ["title", "description", "kind", "path_img", "labels", "num"];
		if (!keys.every((key) => Object.hasOwn(newItem, key) && newItem[key]))
			return "不能留空噢";
		return false;
	};

	/**
	 * 确认添加物品回调
	 */
	const handleSubmit = () => {
		if (!paramCheck()) {
			newItem.labels = "#" + newItem.labels.join("#") + "#";
			AddFormApi.current
				.validate()
				.then((res) => {
					AddGift(newItem).then((res) => {
						if (res.data.code === 200) {
							updateItemList([res.data.data].concat(itemList));
							Toast.success(`${newItem.title} 添加成功`);
						} else {
							Toast.error(res.data.msg);
						}
					});
				})
				.catch(() => {
					Toast.warning("请检查表单必填项");
				});
		} else {
			Toast.error(paramCheck());
		}
	};

	/**
	 * 处理礼品删除回调
	 * @param record
	 * @param index
	 */
	const handleDelete = (record, index) => {
		DelGift(record.id).then((res) => {
			console.log(res.data);
			if (res.data.code === 200) {
				updateItemList(itemList.filter((_, i) => i !== index));
				Toast.success("删除成功");
			} else Toast.error(res.data.msg);
		});
	};

	/**
	 * 数量调整回调
	 * @param record
	 * @param index
	 * @param num
	 */
	const handleUpdateNum = (record, index, num = 1) => {
		if (record.num + num < 0) Toast.error("数量不能小于0");
		else {
			UpdateGift({ id: record.id, num: record.num + num }).then((res) => {
				if (res.data.code === 200) {
					const arr = [].concat(itemList);
					arr[index].num = record.num + num;
					updateItemList(arr);
				} else Toast.error(res.data.msg);
			});
		}
	};

	/**
	 * 礼品开启修改回调
	 * @param record
	 * @param index
	 */
	const handleEditOpen = (record, index) => {
		const obj = { ...record };
		obj.labels = obj.labels.slice(1, -1).split("#");
		setNewItem(obj);
		setEditPanel(true);
	};

	/**
	 * 礼品修改回调
	 */
	const handleEdit = () => {
		const obj = {};
		const keys = [
			"id",
			"title",
			"description",
			"kind",
			"path_img",
			"labels",
			"num",
			"ori_price",
			"is_active",
		];
		keys.forEach((key) => {
			obj[key] = newItem[key];
		});
		obj.labels = "#" + obj.labels.join("#") + "#";

		EditFormApi.current
			.validate()
			.then(() => {
				UpdateGift(obj).then((res) => {
					if (res.data.code === 200) {
						const arr = [].concat(itemList);
						arr.forEach((e) => {
							if (e.id === obj.id) keys.forEach((key) => (e[key] = obj[key]));
						});

						updateItemList(arr);
						Toast.success(`${obj.title} 修改成功`);
					} else Toast.error(res.data.msg);
				});
			})
			.catch(() => {
				Toast.warning("请检查表单必填项");
			});
	};

	/**
	 * 行操作handlers
	 */
	const rowSelection = {
		getCheckboxProps: (record) => ({
			name: record.title,
		}),
		onSelect: (record) => {
			setSelectedList([record].concat(selectedList));
		},
		onSelectAll: (selected, selectedRows) => {
			setSelectedList(selectedRows);
		},
	};

	/**
	 * 批量上下架
	 * @param status
	 */
	const handleActive = (status) => {
		const arr = [];
		selectedList.forEach((e) => {
			arr.push(
				UpdateGift({
					id: e.id,
					is_active: status,
				})
			);
		});

		Promise.all(arr)
			.then((res) => {
				for (const e of res)
					if (e.data.code !== 200) throw new Error(e.data.msg);

				const list = [].concat(itemList);
				selectedList.forEach((e) => {
					list[list.findIndex((item) => item.id === e.id)].is_active = status;
				});
				updateItemList(list);
				Toast.success("操作成功");
			})
			.catch((e) => {
				Toast.error(e.message);
			});
	};

	/**
	 * search搜索回调
	 */
	const handleSearch = () => {
		QueryThingList({
			filter: {
				title: ["like", keyword],
			},
		}).then((res) => {
			if (res.data.code !== 200) {
				Toast.info(res.data.msg);
			} else {
				updateItemList(res.data.data);
			}
		});
	};

	return (
		<div className={"dashboard"}>
			<div className="head">
				<Title heading={3}>物品管理</Title>
				<Space>
					<Button
						icon={<IconPlus />}
						theme={"solid"}
						onClick={() => {
							setAddPanel(true);
						}}
					>
						添加礼品
					</Button>
					<ButtonGroup type={"secondary"}>
						<Button onClick={() => handleActive(true)}>批量上架礼品</Button>
						<Button onClick={() => handleActive(false)}>批量下架礼品</Button>
					</ButtonGroup>
				</Space>
				<div className="search">
					<Input
						placeholder={"搜索物品"}
						prefix={<IconSearch />}
						value={keyword}
						onChange={(v) => setKeyword(v)}
						onEnterPress={handleSearch}
					></Input>
				</div>
			</div>

			<div className="thing-list">
				{itemList && (
					<Table
						columns={columns}
						dataSource={itemList}
						rowSelection={rowSelection}
						rowKey={"id"}
					/>
				)}
			</div>

			<SideSheet
				title={"添加礼品"}
				width={375}
				keepDOM={true}
				visible={addPanel}
				onCancel={() => {
					setAddPanel(false);
				}}
			>
				<div className="add-panel"  style={{maxHeight: "85vh", overflow: "auto"}}>
					<Form
						onChange={(v) => {
							setNewItem(v.values);
						}}
						getFormApi={(formApi) => (AddFormApi.current = formApi)}
					>
						<Form.Input
							field={"title"}
							label={"标题"}
							rules={[{ required: true, message: "这是必填项～" }]}
						/>
						<Row>
							<Col span={12}>
								<Form.InputNumber
									field={"ori_price"}
									label={"价格"}
									min={-1}
									style={{ width: "90%" }}
								/>
							</Col>
							<Col span={12}>
								<Form.InputNumber
									required
									field={"num"}
									label={"数量"}
									min={0}
									rules={[{ required: true, message: "这是必填项～" }]}
								/>
							</Col>
						</Row>
						<Form.Input
							field={"kind"}
							label={"分类"}
							rules={[{ required: true, message: "这是必填项～" }]}
						/>
						<Form.Input
							field={"path_img"}
							label={"图片url"}
							rules={[{ required: true, message: "这是必填项～" }]}
						/>
						<Form.TagInput
							field={"labels"}
							label={"标签"}
							rules={[{ required: true, message: "这是必填项～" }]}
							addOnBlur={true}
						/>
						<Form.TextArea
							field={"description"}
							label={"描述"}
							rules={[{ required: true, message: "这是必填项～" }]}
						/>
					</Form>

					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<Button theme="solid" onClick={handleSubmit}>
							添加
						</Button>
					</div>
				</div>
			</SideSheet>

			<SideSheet
				title={"修改礼品"}
				width={375}
				visible={editPanel}
				onCancel={() => {
					setEditPanel(false);
				}}
			>
				<div className="edit-panel" style={{maxHeight: "85vh", overflow: "auto"}}>
					<Form
						onChange={(v) => {
							setNewItem(v.values);
						}}
						initValues={newItem}
						getFormApi={(formApi) => (EditFormApi.current = formApi)}
					>
						<Form.Input
							field={"title"}
							label={"标题"}
							rules={[{ required: true, message: "这是必填项～" }]}
						/>
						<Row>
							<Col span={12}>
								<Form.InputNumber
									field={"ori_price"}
									label={"价格"}
									min={-1}
									style={{ width: "90%" }}
									rules={[{ required: true, message: "这是必填项～" }]}
								/>
							</Col>
							<Col span={12}>
								<Form.InputNumber
									field={"num"}
									label={"数量"}
									min={0}
									rules={[{ required: true, message: "这是必填项～" }]}
								/>
							</Col>
						</Row>
						<Form.Input
							field={"kind"}
							label={"分类"}
							rules={[{ required: true, message: "这是必填项～" }]}
						/>
						<Form.Input
							field={"path_img"}
							label={"图片url"}
							rules={[{ required: true, message: "这是必填项～" }]}
						/>
						<Form.TagInput
							field={"labels"}
							label={"标签"}
							rules={[{ required: true, message: "这是必填项～" }]}
							addOnBlur={true}
						/>
						<Form.TextArea
							field={"description"}
							label={"描述"}
							rules={[{ required: true, message: "这是必填项～" }]}
						/>
					</Form>

					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<Button theme="solid" onClick={handleEdit}>
							修改
						</Button>
					</div>
				</div>
			</SideSheet>
		</div>
	);
}
