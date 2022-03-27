import axios from "axios";

class Request {
    static DefaultSettings = {
        Protocol: process.env.REACT_APP_PROTOCOL ?? "https",
        BaseUrl:
        process.env.REACT_APP_BACKEND_URL,
        Headers: {
            "Content-Type": "application/json",
            "x-auth-token": JSON.parse(localStorage.getItem("user")),
        },
        queryParams: {},
    };

    static parseQueryParam(queryParams = {}) {
        let params = {
            ...this.DefaultSettings.queryParams,
            ...queryParams,
        };

        return Object.keys(params)
            .map((key) => {
                return `${key}=${Array.isArray(params[key])
                    ? `[${params[key].join(",")}]`
                    : params[key]
                }`;
            })
            .join("&");
    }

    static basic(
        method,
        url,
        headers = {},
        queryParams = {},
        data = null,
        withCredentials = true
    ) {
        return axios({
            method: method,
            url: `${this.DefaultSettings.Protocol}://${this.DefaultSettings.BaseUrl
            }${url}?${this.parseQueryParam(queryParams)}`,
            headers: {
                ...this.DefaultSettings.Headers,
                ...headers,
                "x-auth-token": JSON.parse(localStorage.getItem("user"))?.token
            },
            withCredentials: true,
            xsrfCookieName: "csrftoken",
            xsrfHeaderName: "x-csrftoken",
            data: data,
        });
    }

    static get(url, queryParams = {}, headers = {}) {
        return this.basic("GET", url, headers, queryParams);
    }

    static paginatedGet(
        url,
        pagination = { offset: 0, limit: 10 },
        search = "",
        filter = []
    ) {
        return this.get(url, { ...pagination, search: search, filter: filter });
    }

    static put(url, data, queryParams = {}, headers = {}) {
        return this.basic("PUT", url, headers, queryParams, data);
    }

    static post(url, data, queryParams = {}, headers = {}) {
        return this.basic("POST", url, headers, queryParams, data);
    }

    static delete(url, queryParams = {}, headers = {}, data = {}) {
        return this.basic("DELETE", url, headers, queryParams, data);
    }

    static patch(url, data, queryParams = {}, headers = {}) {
        return this.basic("PATCH", url, headers, queryParams, data);
    }
}

export default Request;