const rootSelector = '[data-js-element-observer]'

class ElementObserver {
  selector = {
    root: rootSelector,
  }

  cssVar = {
    cssVarName: (element) => `--${element.dataset.jsElementObserver}-height`,
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.currentVarName = this.cssVar.cssVarName(this.rootElement)
    this.initObserver()
  }

  initObserver() {
    this.observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize[0].blockSize

        document.documentElement.style.setProperty(this.currentVarName, `${height}px`)
      }
    })

    this.observer.observe(this.rootElement)
  }


}

class ElementObserverCollections {
  constructor() {
    this.init()
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new ElementObserver(element)
    })
  }

}

export default ElementObserverCollections
