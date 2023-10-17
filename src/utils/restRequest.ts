type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type Options = {
    body?: string;
    headers: HeadersInit;
    method: Method;
};

export interface RestRequestProps {
    url: string;
    method?: Method;
    data?: Object | File;
    headers?: HeadersInit;
    noBody?: boolean;
    stringifyBody?: boolean;
    handleLoading?: (progress: number) => any;
    handleUploading?: (progress: number) => any;
}

const restRequest = <Res>({
    url, method = 'GET', data = {}, headers = {}, noBody = false, stringifyBody = true, handleLoading, handleUploading,
}: RestRequestProps): Promise<Res> => {
    const options: Options = {
        method: method!,
        headers: {
            'Content-Type': 'application/json',
            ...Object.keys(headers).filter(el => headers![el]).reduce((acc, el) => ({ ...acc, [el]: headers![el] }), {}),
            ...headers,
        },
    };

    if (!['get', 'head'].includes(method!.toLowerCase())) {
        if (stringifyBody) {
            options.body = JSON.stringify(data);
        } else {
            // @ts-ignore
            options.body = data;
        }
    }

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(options.method, `${url}`);
        Object.keys(options.headers).forEach(el => {
            xhr.setRequestHeader(el, options.headers[el]);
        });
        xhr.onload = function() {
            if (xhr.status !== 200) {
                reject({ status: xhr.status, data: xhr.response });
            } else {
                if (noBody) {
                    resolve(xhr.response);
                } else {
                    resolve(JSON.parse(xhr.response));
                }
            }
        };
        xhr.onerror = function(err) {
            reject({ status: xhr.status, data: xhr.response });
        };
        if (handleUploading) {
            xhr.upload.addEventListener('progress', progress => {
                handleUploading(progress.loaded / progress.total * 100);
            });
        }
        if (handleLoading) {
            xhr.onprogress = function(progress) {
                handleLoading(progress.loaded / progress.total * 100);
            };
        }
        if (options.body) {
            xhr.send(options.body);
        } else {
            xhr.send();
        }
    });
};

export default restRequest;
