// 리액트 내부 코드에 작성돼 있는 파이버 객체
function FiberMode(tag, pendingProps, key, mode) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    this.type = null;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;
    this.ref = null;
    this.refCleanup = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.memoizedState = null;
    this.dependencies = null;

    this.mode = mode;

    // Effects
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.deletions = null;

    this.lanes = Nolanes;
    this.childLanes = Nolanes;

    this.alternate = null;

    // 이하 프로파일러, __DEV__ 코드는 생략
}

// 리액트에 작성돼 있는 파이버를 생성하는 다양한 함수
var createFiber = function (tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
};

// 생략...
function createFiberFromElement(element, mode, lanes) {
    var owner = null;
    {
        owner = element._owner;
    }

    var type = element.type;
    var key = element.key;
    var pendingProps = element.props;
    var fiber = createFiberFromTypeAndProps(
        type,
        key,
        pendingProps,
        owner,
        mode,
        lanes
    );
}

function createfiberFromFragment(elements, mode, lanes, key) {
    var fiber = createFiber(Fragment, elements, key, mode);
    fiber.lanes = lanes;
    return fiber;
}
