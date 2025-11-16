import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, BookOpen, ArrowLeft } from "lucide-react";
import { InteractiveBookReader } from "@/components/books/InteractiveBookReader";

interface BookItem {
  id: string;
  title: string;
  subject: string;
  grade: number;
  pages: number;
  color: string;
}

const sampleBooks: BookItem[] = [
  {
    id: "1",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: 8,
    pages: 45,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Human Body Systems",
    subject: "Science",
    grade: 7,
    pages: 38,
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "World Geography",
    subject: "Social Studies",
    grade: 6,
    pages: 52,
    color: "bg-orange-500",
  },
];

export default function Books() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  if (selectedBook) {
    return (
      <div className="space-y-6 pb-20">
        <Button
          variant="ghost"
          onClick={() => setSelectedBook(null)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Books
        </Button>
        <InteractiveBookReader bookId={selectedBook} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-center shadow-glow animate-fade-in">
        <div className="relative z-10 space-y-3">
          <BookOpen className="w-16 h-16 mx-auto text-primary-foreground animate-float" />
          <h1 className="text-3xl font-bold text-primary-foreground">
            Interactive Books
          </h1>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Tap words for meanings, formulas for explanations, and diagrams to expand them
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Library</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sampleBooks.map((book, index) => (
            <Card
              key={book.id}
              className="glass-effect shadow-card card-hover border-2 border-border/50 hover:border-primary/30 cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedBook(book.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`w-12 h-16 ${book.color} rounded-lg flex items-center justify-center shadow-md`}
                  >
                    <Book className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary">{book.subject}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Grade {book.grade}</span>
                  <span>{book.pages} pages</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="glass-effect shadow-card border-2 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">How to Use Interactive Books</h3>
            <div className="grid md:grid-cols-3 gap-4 mt-4 text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  1
                </div>
                <p className="font-medium">Tap Words</p>
                <p className="text-sm text-muted-foreground">
                  Click any word to see its meaning and usage
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <p className="font-medium">Tap Formulas</p>
                <p className="text-sm text-muted-foreground">
                  Click formulas to get step-by-step explanations
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  3
                </div>
                <p className="font-medium">Tap Diagrams</p>
                <p className="text-sm text-muted-foreground">
                  Click diagrams to expand and explore details
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
