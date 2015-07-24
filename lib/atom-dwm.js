
function layout(item) {
  var pane, r_pane, l_pane, items = atom.workspace.getPanes().reduce(function(acc, p) {
    pane = pane || p;

    return acc.concat(p.getItems());
  }, []);

  r_pane = pane.splitLeft();
  l_pane = r_pane.splitLeft();

  pane.moveItemToPane(items.pop(), l_pane, 0);
  pane.moveItemToPane(items.pop(), r_pane, 0);
  pane.destroy();
  l_pane.activate();
  console.log(item, items);
}

function layout_panes(e) {
  return layout(e.item);

  var panes = atom.workspace.getPanes();

  if(panes.length == 1) {
    panes[0].moveItemToPane(e.item, panes[0].splitLeft(), 0);
    panes[0].destroyItem(e.item);
  }

  if(panes.length > 1) {
    panes[0].moveItemToPane(panes[0].itemAtIndex(0), panes[1].splitUp(), 0);
    panes[0].activate();
  }
}

function activate_pane() {
  var pane, item, panes = atom.workspace.getPanes();

  pane = panes.reduce(function(res, pane) {
    return pane.focused? pane : res;
  }, null);

  item = pane.getActiveItem();

  if(pane && pane !== panes[0]) {
    pane.moveItemToPane(item, panes[0], 0);
    panes[0].getItems().forEach(function(i) {
      if(i !== item)
        layout_panes({item: i});
    });
  }
}


function main(subscriptions) {
  console.log('main');
  atom.workspace.onDidOpen(layout_panes);
  atom.commands.add('atom-workspace', {
    'atom-dwm:activate-pane': activate_pane
  });
}

module.exports =  {
  activate: main
};
