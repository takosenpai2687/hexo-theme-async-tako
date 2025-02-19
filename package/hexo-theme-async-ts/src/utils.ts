export const utils = {
    q: (selectors) => document.querySelector(selectors),
    qa: (selectors) => document.querySelectorAll(selectors),
    gId: (id: string) => document.getElementById(id),
    /**
     * 防抖
     * @param func 
     * @param wait 
     * @param immediate 
     * @returns 
     */
    debounce(func: Function, wait: number, immediate?: boolean) {
        let timeout: any;
        return function () {
            let context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    },
    /**
     * 
     * @param el 
     * @param wrapper 
     * @param options 
     */
    wrap(el: HTMLElement, wrapper: string | HTMLElement, options = {}) {
        if (typeof wrapper === 'string') {
            wrapper = document.createElement(wrapper)
            for (const [key, value] of Object.entries(options)) {
                wrapper.setAttribute(key, value as string)
            }
        }

        el.parentNode.insertBefore(wrapper, el);
        /* el.parentNode.removeChild(el); */
        wrapper.appendChild(el);
    },
    /**
     * 
     * @param path 
     * @returns 
     */
    urlFor(path: string) {
        if (/^(#|\/\/|http(s)?:)/.test(path)) return path;
        return (window.ASYNC_CONFIG.root + path).replace(/\/{2,}/g, '/')
    },
    /**
     * 兄弟选择
     * @param ele 
     * @param selector 
     * @returns 
     */
    siblings: (ele, selector: string) => {
        return [...ele.parentNode.children].filter((child) => {
            if (selector) {
                return child !== ele && child.matches(selector)
            }
            return child !== ele
        })
    },
    _message: [],
    /**
     * 消息弹窗
     * @param title 
     * @param type 
     */
    message(title: string, type = 'success') {
        let message = document.createElement('div')
        message.className = `trm-message ${type}`
        message.style.top = `${30 + utils._message.length * 60}px`
        message.innerText = title
        document.body.append(message)
        utils._message.push(message)
        setTimeout(() => {
            utils._message = utils._message.filter(item => item !== message)
            document.body.removeChild(message)
            utils._message.forEach((item, index) => {
                item.style.top = `${30 + index * 60}px`
            })
        }, 2000)
    },
    /**
     * 动态获取脚本
     * @param url 
     * @param condition 是否存在对应实例，判断是否加载脚本
     * @returns 
     */
    loadScript(url: string, condition: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (condition) {
                resolve()
            } else {
                const script = document.createElement('script');
                script.src = url
                script.setAttribute('async', 'false');
                script.onerror = reject;
                script.onload = () => resolve();
                document.head.appendChild(script)
            }
        })
    },
    /**
     * 执行脚本
     * @param el 
     * @returns 
     */
    runScriptBlock(el: HTMLScriptElement) {
        const code = el.text || el.textContent || el.innerHTML || "";
        const parent = document.head || document.querySelector("head") || document.documentElement;
        const script = document.createElement('script')

        if (code.match("document.write")) {
            if (console && console.log) {
                console.log("Script contains document.write. Can’t be executed correctly. Code skipped ");
            }
            return false;
        }

        try {
            script.appendChild(document.createTextNode(code));
        } catch (e) {
            // old IEs have funky script nodes
            script.text = code;
        }

        // 执行代码块
        parent.appendChild(script);
        // 移除执行后的代码块，避免污染标签
        if (parent.contains(script)) {
            parent.removeChild(script);
        }
    },
    /**
     * 获取图标
     * @param icon 
     * @param type 
     * @returns 
     */
    icons(icon: string, type: 'symbol' | 'font' = 'font') {
        if (type === 'symbol') {
            return `<svg class="symbol-icon " aria-hidden="true"><use xlink:href="#${icon}"></use></svg>`;
        } else {
            return `<i class="iconfont ${icon}"></i>`
        }
    },
    /**
     * 计算时间
     * @param d 
     * @param more 
     * @returns 
     */
    diffDate: (d: string, more = false): number | string => {
        const dateNow = new Date()
        const datePost = new Date(d)
        const dateDiff = dateNow.getTime() - datePost.getTime()
        const minute = 1000 * 60
        const hour = minute * 60
        const day = hour * 24
        const month = day * 30

        let result: number | string
        if (more) {
            const monthCount = dateDiff / month
            const dayCount = dateDiff / day
            const hourCount = dateDiff / hour
            const minuteCount = dateDiff / minute

            if (monthCount > 12) {
                result = datePost.toISOString().slice(0, 10)
            } else if (monthCount >= 1) {
                result = parseInt(monthCount.toString()) + ' ' + window.ASYNC_CONFIG.date_suffix.month
            } else if (dayCount >= 1) {
                result = parseInt(dayCount.toString()) + ' ' + window.ASYNC_CONFIG.date_suffix.day
            } else if (hourCount >= 1) {
                result = parseInt(hourCount.toString()) + ' ' + window.ASYNC_CONFIG.date_suffix.hour
            } else if (minuteCount >= 1) {
                result = parseInt(minuteCount.toString()) + ' ' + window.ASYNC_CONFIG.date_suffix.min
            } else {
                result = window.ASYNC_CONFIG.date_suffix.just
            }
        } else {
            result = parseInt((dateDiff / day).toString())
        }
        return result
    }
}