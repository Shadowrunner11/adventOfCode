class FileSytemObject {
  private _size?: number
  private _name: string

  constructor( name: string, size?: number, public parent?: FileSytemObject){
    this._size = size
    this._name = name
    this.parent = parent
  }

  get size(): number | undefined {
    return this._size
  }

  get name(): string {
    return this._name
  }
}


class Folder extends FileSytemObject {
  private content : FileSytemObject[]
  parent: Folder

  constructor(name: string, size?: number, parent?: Folder, content: FileSytemObject[] = []){
    super(name, size, parent)
    this.parent = parent ?? FileSystemCustom.root
    this.content = [ this, this.parent ,...content]
  }

  override get size(): number{
    return this.size ?? this.content
      .reduce((accumlator, value)=> accumlator + (value.size ?? 0), 0)
  }

  createFileSystemObjects(files: {name: string, size?: number} []){
    this.content
      .push(...files
        .map(({name, size}) => new FileSytemObject(name, size, this)))

    return this
  }

  get path(): string{
    return (this.parent.path ?? '') + '/' + (this.name === 'root' ? '': this.name)
  }

  changeDirectory(path: string){
    FileSystemCustom.changeDirectory(this.path + path)
  }
}


class FileSystemCustom {
  static root = new Folder('root')
  static head = this.root
  static files = [this.root]

  static changeDirectory(path: string){
    const newHead = this.files.find(file => file.path === path)
    if(!newHead)
      throw new Error('Such a folder or file does not exists')

    this.head = newHead
  }
}
