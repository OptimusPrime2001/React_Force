import React, { useEffect, useState } from "react";
import SelectAsync from "./async-select";
import * as authorAction from "../../redux/store/author/author.store";

var query = null;

const AuthorAsyncSelect = (props) => {
    const {authorSelected, handleChooseAuthor} = props;

    const [authorModal, setAuthorModal] = useState([]);

    useEffect(() => {
        getListThemesDefault();
    },[])

    const getListThemesDefault = async () => {
        try {
            let params = {
                pageIndex: 1,
                pageSize: 20,
            }
            const { content } = await authorAction.GetAll(params);
            if (content && content.items && content.items.length > 0) {
                setAuthorModal(content.items.map(item => {
                    return {
                        ...item,
                        value: item.id,
                        label: item.title,
                    };
                }));
            } else {
                setAuthorModal([])
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const onLoadOptions = (inputValue, callback) => {
        if (query) {
            clearTimeout(query);
        }
        if (inputValue.length > 2) {
            query = setTimeout(() => {
                if (inputValue) {
                    const getOptions = async () => {
                        let results = [];
                        let params = {
                            pageIndex: 1,
                            pageSize: 20,
                            Name: inputValue,
                        }
                        const res = await authorAction.GetAll(params);
                        if (res.content.items && res.content.items.length > 0) {
                            results = res.content.items.map(item => {
                                return {
                                    ...item,
                                    value: item.id,
                                    label: item.title,
                                };
                            })
                        }
                        if (results.length == 0) {
                        }
                        callback(results);
                    };
                    getOptions();
                }
            }, 800);
        } else {
            callback([]);
        }
    };

    return (
        <SelectAsync
            value={authorSelected}
            placeholder="Nhập Tác giả"
            noOptionsMessage="Nhập tên tác giả"
            handleChoose={handleChooseAuthor}
            defaultOptions={authorModal}
            onLoadOptions={onLoadOptions}
        />
    )
}

export default AuthorAsyncSelect;