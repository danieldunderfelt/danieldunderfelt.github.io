class CodeView {

	constructor() {
		this.cmBtn = $('#code-mode-btn')
		this.ctxBtn = $('.show-context-btn')
		this.postElement = $('.post')
		this.enabled = false
	}

	initialize() {
		this.postElement.on('click', '#code-mode-btn', this.toggleCM.bind(this))
		this.postElement.on('click', '.show-context-btn', this.toggleContext.bind(this))

		this.entry = $('.entry')
		var entryElements = this.entry.children()
		this.cmStatic = entryElements.filter('.highlight')
		this.cmHide = entryElements.not('.highlight, .cm-show')
		this.cmShow = entryElements.filter('.cm-show')
	}

	toggleCM(e) {
		e.preventDefault()

		if(!this.enabled) {
			this.enableCM()
			this.cmBtn.text("Exit CodeView")
			this.enabled = true
		}
		else {
			this.resetAll()
		}
 	}

	enableCM() {
		this.cmHide.velocity("slideUp", 500)
		this.cmShow.velocity("slideDown", 500)
	}

	disableCM(callback) {
		let done = 0

		this.cmHide.velocity("slideDown", 500, () => {
			if(done++ === 2) callback()
		})
		this.cmShow.velocity("slideUp", 500, () => {
			if(done++ === 2) callback()
		})
	}

	toggleContext(e) {
		e.preventDefault()
		this.currentCtxBtn = $(e.currentTarget)
		var active = this.currentCtxBtn.parent()
		this.contextElements = active.prevAll('p').first().add(active.nextAll('p').first())

		if(!active.hasClass('active')) {
			this.showContext()
			active.addClass('active')
			this.currentCtxBtn.text('Hide context')
		}
		else {
			this.hideContext()
			active.removeClass('active')
			this.currentCtxBtn.text('Show context')
		}
	}

	resetContext() {
		$('.code-caption').removeClass('active').find('.show-context-btn').text('Show context')
	}

	showContext() {
		this.contextElements.velocity("slideDown", 500)
	}

	hideContext() {
		this.contextElements.velocity("slideUp", 500)
	}

	resetAll() {
		let callback = () => {
			this.enabled = false
			this.cmHide.attr('style', '')
			this.cmShow.attr('style', '')
			this.cmBtn.text("Just show me the code")
			this.resetContext()
		}

		this.disableCM(callback)
	}
}

export default CodeView