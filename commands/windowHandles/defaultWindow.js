module.exports.command = async function () {
  const { value: handles } = await this.windowHandles();

  if (Array.isArray(handles) && handles.length >= 1) {
    await this.switchWindow(handles[0]);
  }

  return this;
};
