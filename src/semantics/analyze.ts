import { SyntaxNode, Unit } from "../syntax/syntax-node";

type SemanticSymbol = TypeSymbol;

export class TypeSymbol {
  kind = "TypeSymbol" as const;
  constructor(
    /** Primitive type or Type symbol */
    public baseType: string | TypeSymbol | undefined,
  ) {}
}

export class SemanticContext {
  nodes: Map<string, SyntaxNode> = new Map();
  symbols: Map<SyntaxNode, TypeSymbol> = new Map();

  constructor() {}
}

export function analyze(ctx: SemanticContext, unit: Unit) {
  collectNames(ctx, unit);
  bindNames(ctx, unit);
}

function collectNames(ctx: SemanticContext, node: SyntaxNode) {
  switch (node.kind) {
    case "Unit": {
      for (const decl of node.decls) {
        collectNames(ctx, decl);
      }
      break;
    }
    case "TypeDecl": {
      const symbol = new TypeSymbol(undefined);
      ctx.nodes.set(node.name, node);
      ctx.symbols.set(node, symbol);
      break;
    }
  }
}

function bindNames(ctx: SemanticContext, node: SyntaxNode) {
  switch (node.kind) {
    case "Unit": {
      for (const decl of node.decls) {
        bindNames(ctx, decl);
      }
      break;
    }
    case "TypeDecl": {
      break;
    }
    case "TypeNode": {
      break;
    }
  }
}
