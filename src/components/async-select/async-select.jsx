import React from "react"
import AsyncSelect from 'react-select/async';

var query = null;

const SelectAsync = props => {
    const {
        value,
        placeholder,
        noOptionsMessage,
        handleChoose,
        defaultOptions,
        getOptionsFunction,
        onLoadOptions,
        isMulti = false,
    } = props;

    const loadOptions = (inputValue, callback) => {
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
                        const res = await getOptionsFunction(params);
                        if (res.content.items && res.content.items.length > 0) {
                            results = res.content.items.map(item => {
                                return {
                                    ...item,
                                    value: item.id,
                                    label: item.name ?? item.fondName ?? item.title,
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
        <div className="">
            <AsyncSelect
                className='auto_suggestion'
                placeholder={`${placeholder}`}
                isLoading={false}
                loadOptions={onLoadOptions}
                defaultOptions={defaultOptions}
                onChange={data => {
                    handleChoose(data);
                }}
                isMulti={isMulti}
                isClearable
                value={value}
                components={{ DropdownIndicator: null, LoadingIndicator: null, ClearIndicator: null }}
                noOptionsMessage={() => `${noOptionsMessage}`}
                styles={{
                    input: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "#fff"
                    }),
                }}
            />

        </div>
    )
}

export default SelectAsync; 