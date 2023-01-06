export function postFetch(endpoint, bodyObj) {
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify(bodyObj),
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.success) {
        return res;
      }
      throw Error(JSON.stringify(res))
    }).catch((e) => {
      console.log(e);
      return {};
    });
}

export function getFetch(endpoint, auth) {
  return fetch(endpoint, {
    headers: {
      Authorization: auth,
    },
    method: "GET",
    redirect: "follow",
  }).then(res => {
    return res.json();
  }).then(res => {
    if (res.success) {
      return res;
    }
    throw Error(JSON.stringify(res))
  }).catch((e) => {
    console.log(e);
    return {};
  });
}