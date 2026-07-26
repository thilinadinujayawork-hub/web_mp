Vue.createApp({
	data() {
		return {
			newComment: {
				name: '',
				text: ''
			},
			comments: [
				{
					name: 'Alex',
					text: 'Great platform!',
					message: 'Great platform!'
				},
				{
					name: 'Jordan',
					text: 'Looking forward to the upcoming events.',
					message: 'Looking forward to the upcoming events.'
				}
			]
		};
	},
	methods: {
		// Add a new comment to the list and then clear the form model.
		addComment() {
			const name = (this.newComment.name || '').trim();
			const text = (this.newComment.text || this.newComment.message || '').trim();

			if (!name || !text) {
				return;
			}

			this.comments.push({
				name,
				text,
				message: text
			});

			this.newComment.name = '';
			this.newComment.text = '';

			// Keep compatibility with templates that currently bind newComment.message.
			if (Object.prototype.hasOwnProperty.call(this.newComment, 'message')) {
				this.newComment.message = '';
			}
		},

		// Triggered by form submit with @submit.prevent to avoid page reload.
		submitComment() {
			this.addComment();
		}
	}
}).mount('#app');
