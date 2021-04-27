let tinyDrag = function(customSetting = {
  containerClass: 'drag-container',
  itemClass: 'drag-item'
}) {
  let dragging
  let moveClientY

  let {containerClass, itemClass} = customSetting

  let items = document.querySelectorAll(`.${containerClass} .${itemClass}`)
  items.forEach(item => {
    item.setAttribute('draggable', 'true')
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('drop', dropItem)
    item.addEventListener('dragenter', dragenterItem)
    item.addEventListener('dragover', dragoverItem)
    // item.addEventListener('dragleave', dragleaveItem)
  })

  function dragStart(e) {
    moveClientY = e.clientY
    dragging = e.target
    dragging.classList.add('dragging')
  }

  let containers = document.querySelectorAll(`.${containerClass}`)
  containers.forEach(container => {
    container.addEventListener('drop', dropContainer)
    container.addEventListener('dragenter', dragenterContainer)
    container.addEventListener('dragover', dragoverContainer)
  })

  function dropItem(e) {
    dragging.classList.remove('dragging')
    cancelDefault(e)
  }

  function dragenterItem(e) {
    insertCurr(e.target, dragging, dragging.offsetTop < e.target.offsetTop)
    cancelDefault(e)
  }

  function dragoverItem(e) {
    cancelDefault(e)
  }

  // function dragleaveItem(e) {
  //   cancelDefault(e)
  // }

  function dropContainer(e) {
    dragging.classList.remove('dragging')
    cancelDefault(e)
  }

  function dragenterContainer(e) {
    let targetContainer = findClassParent(e.target, containerClass)
    targetContainer.appendChild(dragging)
    cancelDefault(e)
  }

  function dragoverContainer(e) {
    cancelDefault(e)
  }

  function cancelDefault(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  // function getIdx(node) {
  //   let list = Array.prototype.slice.call(node.parentNode.children)
  //   return list.indexOf(node)
  // }

  function insertCurr(currNode, insertNode, isAsc = true) {
    if (isAsc)
      currNode.parentNode.insertBefore(insertNode, currNode.nextElementSibling)  
    else
      currNode.parentNode.insertBefore(insertNode, currNode)
  }

  function findClassParent(node, className, deep = 3) {
    console.log('node: ', node)
    if (node.classList.contains(className))
      return node
    if (deep <= 0)
      return undefined
    deep -= 1
    return findClassParent(node.parentNode, className, deep)
  }
}