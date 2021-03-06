/**
 * 缓动函数
 */
// ======================================================== 导出
export const ease = {
	// easeOutQuint
	swipe: {
		style: 'cubic-bezier(0.23, 1, 0.32, 1)',
		fn: (t) => {
			return (--t * t * t * t * t) + 1;
		}
	},
	// easeOutQuard
	swipeBounce: {
		style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
		fn: (t) => {
			return t * (2 - t);
		}
	},
	// easeOutQuart
	bounce: {
		style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
		fn: (t) => {
			return 1 - (--t * t * t * t);
		}
	}
};
