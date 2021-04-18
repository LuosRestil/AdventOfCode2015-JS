function getAllPermutations(list) {
  if (list.length === 1) {
    return [list];
  }

  let perms = [];
  for (let i = 0; i < list.length; i++) {
    let curr = list[i];
    let remaining = getAllPermutations(list.slice(0, i).concat(list.slice(i + 1, list.length)));
    for (let perm of remaining) {
      perms.push([curr, ...perm]);
    }
  }

  return perms;
}

module.exports = getAllPermutations;